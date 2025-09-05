from django.urls import path
from . import views

app_name = 'store'

urlpatterns = [
    # Categories
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    
    # Products
    path('products/', views.ProductListView.as_view(), name='product-list'),
    path('products/featured/', views.FeaturedProductsView.as_view(), name='featured-products'),
    path('products/search/', views.search_products, name='product-search'),
    path('products/<slug:slug>/', views.ProductDetailView.as_view(), name='product-detail'),
    
    # Cart
    path('cart/', views.get_cart, name='get-cart'),
    path('cart/add/', views.add_to_cart, name='add-to-cart'),
    path('cart/item/<int:item_id>/', views.update_cart_item, name='update-cart-item'),
    path('cart/item/<int:item_id>/remove/', views.remove_from_cart, name='remove-from-cart'),
    path('cart/clear/', views.clear_cart, name='clear-cart'),
    
    # Orders
    path('orders/', views.OrderListView.as_view(), name='order-list'),
    path('orders/create/', views.CreateOrderView.as_view(), name='create-order'),
    path('orders/<str:order_number>/', views.OrderDetailView.as_view(), name='order-detail'),
    
    # Reviews
    path('products/<slug:product_slug>/reviews/', views.ProductReviewListView.as_view(), name='product-reviews'),
]
