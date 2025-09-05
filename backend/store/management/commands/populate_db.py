from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from store.models import Category, Product, ProductImage, ProductAttribute
import random
from decimal import Decimal


class Command(BaseCommand):
    help = 'Populate the database with sample e-commerce data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting to populate database...'))

        # Create categories
        categories_data = [
            {
                'name': 'Electronics',
                'description': 'Smartphones, laptops, tablets, and other electronic devices',
            },
            {
                'name': 'Clothing',
                'description': 'Fashion and apparel for men, women, and children',
            },
            {
                'name': 'Home & Garden',
                'description': 'Home decor, furniture, and garden supplies',
            },
            {
                'name': 'Sports & Outdoors',
                'description': 'Sporting goods and outdoor equipment',
            },
            {
                'name': 'Books & Media',
                'description': 'Books, movies, music, and digital media',
            },
            {
                'name': 'Beauty & Health',
                'description': 'Cosmetics, skincare, and health products',
            },
        ]

        categories = []
        for cat_data in categories_data:
            category, created = Category.objects.get_or_create(
                name=cat_data['name'],
                defaults=cat_data
            )
            categories.append(category)
            if created:
                self.stdout.write(f'Created category: {category.name}')

        # Create products
        products_data = [
            # Electronics
            {
                'name': 'iPhone 15 Pro',
                'description': 'The latest iPhone with advanced camera system and A17 Pro chip.',
                'price': Decimal('999.99'),
                'original_price': Decimal('1099.99'),
                'category': 'Electronics',
                'stock_quantity': 50,
                'brand': 'Apple',
                'is_featured': True,
                'attributes': {
                    'Screen Size': '6.1 inches',
                    'Storage': '128GB',
                    'Color': 'Natural Titanium',
                    'Operating System': 'iOS 17',
                }
            },
            {
                'name': 'Samsung Galaxy S24 Ultra',
                'description': 'Premium Android smartphone with S Pen and advanced AI features.',
                'price': Decimal('1199.99'),
                'category': 'Electronics',
                'stock_quantity': 30,
                'brand': 'Samsung',
                'is_featured': True,
                'attributes': {
                    'Screen Size': '6.8 inches',
                    'Storage': '256GB',
                    'Color': 'Titanium Gray',
                    'Operating System': 'Android 14',
                }
            },
            {
                'name': 'MacBook Pro 14-inch',
                'description': 'Powerful laptop with M3 chip for professional work.',
                'price': Decimal('1999.99'),
                'category': 'Electronics',
                'stock_quantity': 20,
                'brand': 'Apple',
                'is_featured': True,
                'attributes': {
                    'Processor': 'Apple M3',
                    'RAM': '16GB',
                    'Storage': '512GB SSD',
                    'Screen Size': '14.2 inches',
                }
            },
            
            # Clothing
            {
                'name': 'Classic Denim Jacket',
                'description': 'Timeless denim jacket perfect for any casual outfit.',
                'price': Decimal('79.99'),
                'original_price': Decimal('99.99'),
                'category': 'Clothing',
                'stock_quantity': 100,
                'brand': 'Urban Style',
                'attributes': {
                    'Material': '100% Cotton',
                    'Size': 'M',
                    'Color': 'Blue',
                    'Fit': 'Regular',
                }
            },
            {
                'name': 'Running Sneakers',
                'description': 'Comfortable running shoes with advanced cushioning.',
                'price': Decimal('129.99'),
                'category': 'Clothing',
                'stock_quantity': 75,
                'brand': 'SportMax',
                'is_featured': True,
                'attributes': {
                    'Size': '9',
                    'Color': 'Black/White',
                    'Material': 'Mesh/Synthetic',
                    'Type': 'Running',
                }
            },
            
            # Home & Garden
            {
                'name': 'Modern Coffee Table',
                'description': 'Sleek modern coffee table with glass top and wooden legs.',
                'price': Decimal('299.99'),
                'category': 'Home & Garden',
                'stock_quantity': 15,
                'brand': 'HomeStyle',
                'attributes': {
                    'Material': 'Glass/Wood',
                    'Dimensions': '120x60x45 cm',
                    'Color': 'Natural Oak',
                    'Style': 'Modern',
                }
            },
            {
                'name': 'Ceramic Plant Pot Set',
                'description': 'Set of 3 beautiful ceramic plant pots in different sizes.',
                'price': Decimal('39.99'),
                'original_price': Decimal('49.99'),
                'category': 'Home & Garden',
                'stock_quantity': 60,
                'brand': 'GreenLife',
                'attributes': {
                    'Material': 'Ceramic',
                    'Sizes': 'Small, Medium, Large',
                    'Color': 'White',
                    'Drainage': 'Yes',
                }
            },
            
            # Sports & Outdoors
            {
                'name': 'Professional Tennis Racket',
                'description': 'High-quality tennis racket for intermediate to advanced players.',
                'price': Decimal('189.99'),
                'category': 'Sports & Outdoors',
                'stock_quantity': 25,
                'brand': 'ProSport',
                'attributes': {
                    'Weight': '300g',
                    'Head Size': '100 sq in',
                    'String Pattern': '16x19',
                    'Grip Size': '4 1/4',
                }
            },
            {
                'name': 'Hiking Backpack 50L',
                'description': 'Durable hiking backpack with multiple compartments.',
                'price': Decimal('159.99'),
                'category': 'Sports & Outdoors',
                'stock_quantity': 40,
                'brand': 'TrailMaster',
                'is_featured': True,
                'attributes': {
                    'Capacity': '50 Liters',
                    'Material': 'Ripstop Nylon',
                    'Weight': '2.1 kg',
                    'Waterproof': 'Yes',
                }
            },
            
            # Books & Media
            {
                'name': 'The Great Gatsby - Classic Edition',
                'description': 'F. Scott Fitzgerald\'s masterpiece in a beautiful hardcover edition.',
                'price': Decimal('24.99'),
                'category': 'Books & Media',
                'stock_quantity': 80,
                'brand': 'Classic Books',
                'attributes': {
                    'Author': 'F. Scott Fitzgerald',
                    'Pages': '240',
                    'Format': 'Hardcover',
                    'Language': 'English',
                }
            },
            
            # Beauty & Health
            {
                'name': 'Vitamin C Serum',
                'description': 'Anti-aging vitamin C serum for glowing skin.',
                'price': Decimal('49.99'),
                'original_price': Decimal('59.99'),
                'category': 'Beauty & Health',
                'stock_quantity': 90,
                'brand': 'GlowSkin',
                'attributes': {
                    'Volume': '30ml',
                    'Skin Type': 'All',
                    'Key Ingredient': 'Vitamin C',
                    'Paraben Free': 'Yes',
                }
            },
        ]

        # Create products
        for product_data in products_data:
            category_name = product_data.pop('category')
            attributes_data = product_data.pop('attributes', {})
            
            category = Category.objects.get(name=category_name)
            product_data['category'] = category
            
            # Add random rating
            product_data['rating'] = round(random.uniform(3.5, 5.0), 1)
            product_data['reviews_count'] = random.randint(5, 100)
            
            product, created = Product.objects.get_or_create(
                name=product_data['name'],
                defaults=product_data
            )
            
            if created:
                self.stdout.write(f'Created product: {product.name}')
                
                # Add attributes
                for attr_name, attr_value in attributes_data.items():
                    ProductAttribute.objects.create(
                        product=product,
                        name=attr_name,
                        value=attr_value
                    )

        # Create a superuser if it doesn't exist
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                username='admin',
                email='admin@example.com',
                password='admin123'
            )
            self.stdout.write(self.style.SUCCESS('Created admin user: admin/admin123'))

        self.stdout.write(self.style.SUCCESS('Database populated successfully!'))
