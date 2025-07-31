from django.shortcuts import render, get_object_or_404
from django.db.models import Q, Avg, F
from rest_framework import generics, status, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters_rf

from .models import Category, Product, Cart, CartItem, Order, Review
from .serializers import (
    CategorySerializer, ProductListSerializer, ProductDetailSerializer,
    CartSerializer, AddToCartSerializer, UpdateCartItemSerializer,
    OrderSerializer, CreateOrderSerializer, ReviewSerializer
)


class CategoryFilter(filters_rf.FilterSet):
    name = filters_rf.CharFilter(lookup_expr='icontains')
    
    class Meta:
        model = Category
        fields = ['name', 'is_active']


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = CategoryFilter
    search_fields = ['name', 'description']
    permission_classes = [AllowAny]


class ProductFilter(filters_rf.FilterSet):
    min_price = filters_rf.NumberFilter(field_name="price", lookup_expr='gte')
    max_price = filters_rf.NumberFilter(field_name="price", lookup_expr='lte')
    category = filters_rf.CharFilter(field_name="category__slug", lookup_expr='exact')
    brand = filters_rf.CharFilter(lookup_expr='icontains')
    in_stock = filters_rf.BooleanFilter(method='filter_in_stock')
    on_sale = filters_rf.BooleanFilter(method='filter_on_sale')
    featured = filters_rf.BooleanFilter(field_name='is_featured')

    class Meta:
        model = Product
        fields = ['category', 'brand', 'is_active', 'is_featured']

    def filter_in_stock(self, queryset, name, value):
        if value:
            return queryset.filter(stock_quantity__gt=0)
        return queryset

    def filter_on_sale(self, queryset, name, value):
        if value:
            return queryset.filter(original_price__isnull=False, original_price__gt=F('price'))
        return queryset


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ['name', 'description', 'brand', 'category__name']
    ordering_fields = ['price', 'created_at', 'rating', 'name']
    ordering = ['-created_at']
    permission_classes = [AllowAny]


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductDetailSerializer
    lookup_field = 'slug'
    permission_classes = [AllowAny]


class FeaturedProductsView(generics.ListAPIView):
    queryset = Product.objects.filter(is_active=True, is_featured=True)
    serializer_class = ProductListSerializer
    permission_classes = [AllowAny]


@api_view(['GET'])
@permission_classes([AllowAny])
def get_cart(request):
    """Get or create cart for the current user/session."""
    if request.user.is_authenticated:
        cart, created = Cart.objects.get_or_create(user=request.user)
    else:
        session_key = request.session.session_key
        if not session_key:
            request.session.create()
            session_key = request.session.session_key
        cart, created = Cart.objects.get_or_create(session_key=session_key)
    
    serializer = CartSerializer(cart)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])
def add_to_cart(request):
    """Add item to cart."""
    serializer = AddToCartSerializer(data=request.data)
    if serializer.is_valid():
        product_id = serializer.validated_data['product_id']
        quantity = serializer.validated_data['quantity']
        
        try:
            product = Product.objects.get(id=product_id, is_active=True)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if product.stock_quantity < quantity:
            return Response({'error': 'Insufficient stock'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get or create cart
        if request.user.is_authenticated:
            cart, created = Cart.objects.get_or_create(user=request.user)
        else:
            session_key = request.session.session_key
            if not session_key:
                request.session.create()
                session_key = request.session.session_key
            cart, created = Cart.objects.get_or_create(session_key=session_key)
        
        # Add or update cart item
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': quantity}
        )
        
        if not created:
            cart_item.quantity += quantity
            if cart_item.quantity > product.stock_quantity:
                return Response({'error': 'Insufficient stock'}, status=status.HTTP_400_BAD_REQUEST)
            cart_item.save()
        
        cart_serializer = CartSerializer(cart)
        return Response(cart_serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([AllowAny])
def update_cart_item(request, item_id):
    """Update cart item quantity."""
    try:
        if request.user.is_authenticated:
            cart_item = CartItem.objects.get(id=item_id, cart__user=request.user)
        else:
            session_key = request.session.session_key
            cart_item = CartItem.objects.get(id=item_id, cart__session_key=session_key)
    except CartItem.DoesNotExist:
        return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = UpdateCartItemSerializer(data=request.data)
    if serializer.is_valid():
        quantity = serializer.validated_data['quantity']
        
        if quantity == 0:
            cart_item.delete()
        else:
            if quantity > cart_item.product.stock_quantity:
                return Response({'error': 'Insufficient stock'}, status=status.HTTP_400_BAD_REQUEST)
            cart_item.quantity = quantity
            cart_item.save()
        
        cart_serializer = CartSerializer(cart_item.cart)
        return Response(cart_serializer.data)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def remove_from_cart(request, item_id):
    """Remove item from cart."""
    try:
        if request.user.is_authenticated:
            cart_item = CartItem.objects.get(id=item_id, cart__user=request.user)
        else:
            session_key = request.session.session_key
            cart_item = CartItem.objects.get(id=item_id, cart__session_key=session_key)
        
        cart = cart_item.cart
        cart_item.delete()
        
        cart_serializer = CartSerializer(cart)
        return Response(cart_serializer.data)
    except CartItem.DoesNotExist:
        return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def clear_cart(request):
    """Clear all items from cart."""
    if request.user.is_authenticated:
        cart = Cart.objects.filter(user=request.user).first()
    else:
        session_key = request.session.session_key
        cart = Cart.objects.filter(session_key=session_key).first()
    
    if cart:
        cart.items.all().delete()
        cart_serializer = CartSerializer(cart)
        return Response(cart_serializer.data)
    
    return Response({'message': 'Cart is already empty'})


class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering = ['-created_at']

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class OrderDetailView(generics.RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'order_number'

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


class CreateOrderView(generics.CreateAPIView):
    serializer_class = CreateOrderSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # Check if user has items in cart
        cart = Cart.objects.filter(user=request.user).first()
        if not cart or not cart.items.exists():
            return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)
        
        return super().create(request, *args, **kwargs)


class ProductReviewListView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        product_slug = self.kwargs['product_slug']
        return Review.objects.filter(product__slug=product_slug)

    def perform_create(self, serializer):
        product_slug = self.kwargs['product_slug']
        product = get_object_or_404(Product, slug=product_slug)
        serializer.save(user=self.request.user, product=product)
        
        # Update product rating
        avg_rating = Review.objects.filter(product=product).aggregate(Avg('rating'))['rating__avg']
        product.rating = avg_rating or 0
        product.reviews_count = Review.objects.filter(product=product).count()
        product.save()


@api_view(['GET'])
@permission_classes([AllowAny])
def search_products(request):
    """Advanced product search."""
    query = request.GET.get('q', '')
    category = request.GET.get('category', '')
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')
    sort_by = request.GET.get('sort', 'name')
    
    products = Product.objects.filter(is_active=True)
    
    if query:
        products = products.filter(
            Q(name__icontains=query) |
            Q(description__icontains=query) |
            Q(brand__icontains=query) |
            Q(category__name__icontains=query)
        )
    
    if category:
        products = products.filter(category__slug=category)
    
    if min_price:
        products = products.filter(price__gte=min_price)
    
    if max_price:
        products = products.filter(price__lte=max_price)
    
    # Sorting
    if sort_by == 'price_low':
        products = products.order_by('price')
    elif sort_by == 'price_high':
        products = products.order_by('-price')
    elif sort_by == 'rating':
        products = products.order_by('-rating')
    elif sort_by == 'newest':
        products = products.order_by('-created_at')
    else:
        products = products.order_by('name')
    
    serializer = ProductListSerializer(products, many=True)
    return Response(serializer.data)
