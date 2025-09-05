// Netlify Function for products API
const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    slug: 'iphone-15-pro',
    price: 999.99,
    original_price: 1099.99,
    category_name: 'Electronics',
    category_slug: 'electronics',
    primary_image: '/images/products/iphone-15-pro.jpg',
    image: '/images/products/iphone-15-pro.jpg',
    images: [
      { image: '/images/products/iphone-15-pro.jpg', is_primary: true },
      { image: '/images/products/iphone-15-pro-2.jpg', is_primary: false }
    ],
    description: 'The latest iPhone with advanced camera system and A17 Pro chip.',
    is_in_stock: true,
    is_featured: true,
    is_on_sale: true,
    discount_percentage: 9,
    rating: 4.5,
    reviews_count: 45,
    brand: 'Apple',
    stock_quantity: 50,
    attributes: [
      { name: 'Screen Size', value: '6.1 inches' },
      { name: 'Storage', value: '128GB' },
      { name: 'Color', value: 'Natural Titanium' },
      { name: 'Operating System', value: 'iOS 17' }
    ],
    reviews: [
      {
        id: 1,
        user_name: 'John Doe',
        rating: 5,
        title: 'Excellent phone!',
        comment: 'Love the camera quality and performance.',
        created_at: '2025-01-15T10:30:00Z'
      }
    ]
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    price: 1199.99,
    category_name: 'Electronics',
    category_slug: 'electronics',
    primary_image: '/images/products/samsung-galaxy-s24.jpg',
    image: '/images/products/samsung-galaxy-s24.jpg',
    images: [
      { image: '/images/products/samsung-galaxy-s24.jpg', is_primary: true }
    ],
    description: 'Premium Android smartphone with S Pen and advanced AI features.',
    is_in_stock: true,
    is_featured: true,
    is_on_sale: false,
    discount_percentage: 0,
    rating: 4.3,
    reviews_count: 32,
    brand: 'Samsung',
    stock_quantity: 30,
    attributes: [
      { name: 'Screen Size', value: '6.8 inches' },
      { name: 'Storage', value: '256GB' },
      { name: 'Color', value: 'Titanium Gray' },
      { name: 'Operating System', value: 'Android 14' }
    ],
    reviews: []
  },
  {
    id: 3,
    name: 'MacBook Pro 14-inch',
    slug: 'macbook-pro-14-inch',
    price: 1999.99,
    category_name: 'Electronics',
    category_slug: 'electronics',
    primary_image: '/images/products/macbook-pro-14.jpg',
    image: '/images/products/macbook-pro-14.jpg',
    images: [
      { image: '/images/products/macbook-pro-14.jpg', is_primary: true }
    ],
    description: 'Powerful laptop with M3 chip for professional work.',
    is_in_stock: true,
    is_featured: true,
    is_on_sale: false,
    discount_percentage: 0,
    rating: 4.7,
    reviews_count: 28,
    brand: 'Apple',
    stock_quantity: 20,
    attributes: [
      { name: 'Processor', value: 'Apple M3' },
      { name: 'RAM', value: '16GB' },
      { name: 'Storage', value: '512GB SSD' },
      { name: 'Screen Size', value: '14.2 inches' }
    ],
    reviews: []
  },
  {
    id: 4,
    name: 'Classic Denim Jacket',
    slug: 'classic-denim-jacket',
    price: 79.99,
    original_price: 99.99,
    category_name: 'Clothing',
    category_slug: 'clothing',
    primary_image: '/images/products/denim-jacket.jpg',
    image: '/images/products/denim-jacket.jpg',
    images: [
      { image: '/images/products/denim-jacket.jpg', is_primary: true }
    ],
    description: 'Timeless denim jacket perfect for any casual outfit.',
    is_in_stock: true,
    is_featured: false,
    is_on_sale: true,
    discount_percentage: 20,
    rating: 4.2,
    reviews_count: 15,
    brand: 'Urban Style',
    stock_quantity: 100,
    attributes: [
      { name: 'Material', value: '100% Cotton' },
      { name: 'Size', value: 'M' },
      { name: 'Color', value: 'Blue' },
      { name: 'Fit', value: 'Regular' }
    ],
    reviews: []
  },
  {
    id: 5,
    name: 'Running Sneakers',
    slug: 'running-sneakers',
    price: 129.99,
    category_name: 'Clothing',
    category_slug: 'clothing',
    primary_image: '/images/products/running-sneakers.jpg',
    image: '/images/products/running-sneakers.jpg',
    images: [
      { image: '/images/products/running-sneakers.jpg', is_primary: true }
    ],
    description: 'Comfortable running shoes with advanced cushioning.',
    is_in_stock: true,
    is_featured: true,
    is_on_sale: false,
    discount_percentage: 0,
    rating: 4.4,
    reviews_count: 67,
    brand: 'SportMax',
    stock_quantity: 75,
    attributes: [
      { name: 'Size', value: '9' },
      { name: 'Color', value: 'Black/White' },
      { name: 'Material', value: 'Mesh/Synthetic' },
      { name: 'Type', value: 'Running' }
    ],
    reviews: []
  },
  {
    id: 6,
    name: 'Modern Coffee Table',
    slug: 'modern-coffee-table',
    price: 299.99,
    category_name: 'Home & Garden',
    category_slug: 'home-garden',
    primary_image: '/images/products/coffee-table.jpg',
    image: '/images/products/coffee-table.jpg',
    images: [
      { image: '/images/products/coffee-table.jpg', is_primary: true }
    ],
    description: 'Sleek modern coffee table with glass top and wooden legs.',
    is_in_stock: true,
    is_featured: false,
    is_on_sale: false,
    discount_percentage: 0,
    rating: 4.1,
    reviews_count: 8,
    brand: 'HomeStyle',
    stock_quantity: 15,
    attributes: [
      { name: 'Material', value: 'Glass/Wood' },
      { name: 'Dimensions', value: '120x60x45 cm' },
      { name: 'Color', value: 'Natural Oak' },
      { name: 'Style', value: 'Modern' }
    ],
    reviews: []
  }
];

const categories = [
  { id: 1, name: 'Electronics', slug: 'electronics', is_active: true },
  { id: 2, name: 'Clothing', slug: 'clothing', is_active: true },
  { id: 3, name: 'Home & Garden', slug: 'home-garden', is_active: true },
  { id: 4, name: 'Sports & Outdoors', slug: 'sports-outdoors', is_active: true },
  { id: 5, name: 'Books & Media', slug: 'books-media', is_active: true },
  { id: 6, name: 'Beauty & Health', slug: 'beauty-health', is_active: true }
];

exports.handler = async (event, context) => {
  const { httpMethod, path, queryStringParameters } = event;
  
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Parse the path to determine the endpoint
    const pathSegments = path.split('/').filter(segment => segment);
    const endpoint = pathSegments[pathSegments.length - 1];

    if (httpMethod === 'GET') {
      switch (endpoint) {
        case 'products':
          // Handle product listing with filters
          let filteredProducts = [...products];
          
          if (queryStringParameters) {
            const { category, q, min_price, max_price, sort } = queryStringParameters;
            
            // Filter by category
            if (category && category !== 'all') {
              filteredProducts = filteredProducts.filter(p => p.category_slug === category);
            }
            
            // Search filter
            if (q) {
              const searchTerm = q.toLowerCase();
              filteredProducts = filteredProducts.filter(p =>
                p.name.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm) ||
                p.brand.toLowerCase().includes(searchTerm)
              );
            }
            
            // Price filters
            if (min_price) {
              filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(min_price));
            }
            if (max_price) {
              filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(max_price));
            }
            
            // Sorting
            if (sort) {
              switch (sort) {
                case 'price_low':
                  filteredProducts.sort((a, b) => a.price - b.price);
                  break;
                case 'price_high':
                  filteredProducts.sort((a, b) => b.price - a.price);
                  break;
                case 'rating':
                  filteredProducts.sort((a, b) => b.rating - a.rating);
                  break;
                case 'newest':
                  // Already sorted by newest (id desc)
                  break;
                default:
                  filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
              }
            }
          }
          
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              count: filteredProducts.length,
              results: filteredProducts
            })
          };

        case 'featured':
          const featuredProducts = products.filter(p => p.is_featured);
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              count: featuredProducts.length,
              results: featuredProducts
            })
          };

        case 'categories':
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              count: categories.length,
              results: categories
            })
          };

        default:
          // Check if it's a product slug
          const productBySlug = products.find(p => p.slug === endpoint);
          if (productBySlug) {
            return {
              statusCode: 200,
              headers,
              body: JSON.stringify(productBySlug)
            };
          }
          
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Endpoint not found' })
          };
      }
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', message: error.message })
    };
  }
};
