# E-commerce Backend API

A Django REST API backend for a modern e-commerce application with comprehensive product management, shopping cart functionality, order processing, and user reviews.

## Features

### 🛍️ Product Management
- **Categories**: Organize products into hierarchical categories
- **Products**: Complete product information with images, attributes, and specifications
- **Product Images**: Multiple images per product with gallery support
- **Product Attributes**: Flexible attribute system (color, size, material, etc.)
- **Inventory Management**: Stock tracking and availability status
- **Featured Products**: Highlight special or promoted products

### 🛒 Shopping Cart
- **Session-based Cart**: Support for anonymous users
- **User Cart**: Persistent cart for registered users
- **Cart Management**: Add, update, remove items and quantities
- **Stock Validation**: Prevent overselling with real-time stock checks

### 📦 Order Management
- **Order Creation**: Convert cart to order with customer details
- **Order Tracking**: Track order status from pending to delivered
- **Order History**: Complete order history for users
- **Order Items**: Detailed order line items with pricing snapshot

### ⭐ Review System
- **Product Reviews**: Customer reviews and ratings
- **Rating Aggregation**: Automatic rating calculation and review counts
- **Verified Purchases**: Mark reviews from verified buyers

### 🔍 Search & Filtering
- **Advanced Search**: Search across product name, description, brand, and category
- **Category Filtering**: Filter products by category
- **Price Range**: Filter by minimum and maximum price
- **Sorting**: Sort by price, rating, date, and name
- **Stock Status**: Filter by availability

### 🔐 API Security
- **CORS Configuration**: Configured for frontend integration
- **Session Management**: Secure session handling
- **Permission System**: Protected endpoints for authenticated users

## Technology Stack

- **Framework**: Django 5.1.6
- **API**: Django REST Framework 3.15.2
- **Database**: SQLite (development) / PostgreSQL (production ready)
- **Image Handling**: Pillow for image processing
- **Filtering**: django-filter for advanced filtering
- **CORS**: django-cors-headers for frontend integration

## API Endpoints

### Categories
- `GET /api/categories/` - List all categories
- Search and filter support

### Products  
- `GET /api/products/` - List products with pagination
- `GET /api/products/featured/` - Get featured products
- `GET /api/products/search/` - Advanced product search
- `GET /api/products/{slug}/` - Get product details

### Shopping Cart
- `GET /api/cart/` - Get current cart
- `POST /api/cart/add/` - Add item to cart
- `PUT /api/cart/item/{id}/` - Update cart item quantity
- `DELETE /api/cart/item/{id}/remove/` - Remove item from cart
- `DELETE /api/cart/clear/` - Clear entire cart

### Orders (Authenticated)
- `GET /api/orders/` - List user orders
- `POST /api/orders/create/` - Create new order
- `GET /api/orders/{order_number}/` - Get order details

### Reviews
- `GET /api/products/{slug}/reviews/` - Get product reviews
- `POST /api/products/{slug}/reviews/` - Add product review (authenticated)

## Installation & Setup

### Prerequisites
- Python 3.8+
- pip (Python package manager)

### Quick Setup

#### Windows
```bash
# Run the setup script
setup.bat
```

#### Linux/macOS
```bash
# Make script executable and run
chmod +x setup.sh
./setup.sh
```

### Manual Setup

1. **Create Virtual Environment**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Linux/macOS
   source venv/bin/activate
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Database Setup**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Populate Sample Data**
   ```bash
   python manage.py populate_db
   ```

5. **Start Development Server**
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000/api/`

### Admin Interface

Access the Django admin at `http://localhost:8000/admin/`

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

## Configuration

### Environment Variables
Create a `.env` file in the backend directory:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (optional - defaults to SQLite)
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce

# CORS Settings
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Settings Configuration

Key settings in `backend/settings.py`:

- **CORS_ALLOWED_ORIGINS**: Configure frontend URLs
- **ALLOWED_HOSTS**: Add your domain for production
- **DATABASES**: Configure your database
- **MEDIA_ROOT**: Configure media file storage

## Sample Data

The `populate_db` command creates:

- **6 Categories**: Electronics, Clothing, Home & Garden, Sports & Outdoors, Books & Media, Beauty & Health
- **12 Products**: Sample products across all categories with realistic data
- **Product Attributes**: Size, color, material, specifications
- **Admin User**: Username `admin`, Password `admin123`

## Database Models

### Core Models
- **Category**: Product categories with hierarchical support
- **Product**: Main product model with pricing, inventory, and metadata
- **ProductImage**: Product image gallery
- **ProductAttribute**: Flexible product specifications
- **Review**: Customer reviews and ratings

### E-commerce Models
- **Cart**: Shopping cart for users/sessions
- **CartItem**: Individual cart items
- **Order**: Customer orders
- **OrderItem**: Order line items

## API Response Examples

### Product List Response
```json
{
  "count": 12,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "iPhone 15 Pro",
      "slug": "iphone-15-pro",
      "price": "999.99",
      "original_price": "1099.99",
      "category_name": "Electronics",
      "primary_image": "/media/products/iphone-15-pro.jpg",
      "is_in_stock": true,
      "is_on_sale": true,
      "discount_percentage": 9,
      "rating": "4.5",
      "reviews_count": 45,
      "is_featured": true
    }
  ]
}
```

### Cart Response
```json
{
  "id": 1,
  "items": [
    {
      "id": 1,
      "product": 1,
      "product_name": "iPhone 15 Pro",
      "product_price": "999.99",
      "product_image": "/media/products/iphone-15-pro.jpg",
      "quantity": 1,
      "total_price": "999.99"
    }
  ],
  "total_items": 1,
  "total_price": "999.99",
  "created_at": "2025-01-01T12:00:00Z",
  "updated_at": "2025-01-01T12:00:00Z"
}
```

## Production Deployment

### Database Migration
For production, configure PostgreSQL:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'ecommerce',
        'USER': 'your_user',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

### Static Files
Configure static file serving:

```bash
python manage.py collectstatic
```

### Security Settings
Update for production:

```python
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']
SECURE_SSL_REDIRECT = True
SECURE_HSTS_SECONDS = 3600
```

## Development

### Code Structure
```
backend/
├── backend/           # Django project settings
│   ├── settings.py    # Main configuration
│   ├── urls.py        # URL routing
│   └── wsgi.py        # WSGI application
├── store/             # Main application
│   ├── models.py      # Database models
│   ├── serializers.py # API serializers
│   ├── views.py       # API views
│   ├── urls.py        # API endpoints
│   └── admin.py       # Admin interface
├── manage.py          # Django management
└── requirements.txt   # Dependencies
```

### Adding New Features

1. **Models**: Add new models in `store/models.py`
2. **Serializers**: Create API serializers in `store/serializers.py`
3. **Views**: Implement API views in `store/views.py`
4. **URLs**: Add endpoints in `store/urls.py`
5. **Admin**: Register models in `store/admin.py`

### Running Tests
```bash
python manage.py test
```

## API Documentation

The API follows REST principles and returns JSON responses. All endpoints support standard HTTP methods (GET, POST, PUT, DELETE) where appropriate.

### Authentication
- Some endpoints require authentication (orders, reviews creation)
- Use Django's session authentication or token authentication
- Cart functionality works for both authenticated and anonymous users

### Error Handling
- Standard HTTP status codes
- Consistent error response format
- Validation errors with field-specific messages

### Pagination
- Default page size: 20 items
- Configurable in settings
- Standard pagination response format

## Support

For issues and questions:
1. Check the Django documentation
2. Review the DRF documentation
3. Check the sample data and API responses
4. Test endpoints with the admin interface

## License

This project is open source and available under the MIT License.
