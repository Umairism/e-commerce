// Netlify Function for categories API
const categories = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    description: 'Smartphones, laptops, tablets, and other electronic devices',
    image: '/images/categories/electronics.jpg',
    is_active: true,
    products_count: 15
  },
  {
    id: 2,
    name: 'Clothing',
    slug: 'clothing',
    description: 'Fashion and apparel for men, women, and children',
    image: '/images/categories/clothing.jpg',
    is_active: true,
    products_count: 8
  },
  {
    id: 3,
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Home decor, furniture, and garden supplies',
    image: '/images/categories/home-garden.jpg',
    is_active: true,
    products_count: 12
  },
  {
    id: 4,
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    description: 'Sporting goods and outdoor equipment',
    image: '/images/categories/sports-outdoors.jpg',
    is_active: true,
    products_count: 6
  },
  {
    id: 5,
    name: 'Books & Media',
    slug: 'books-media',
    description: 'Books, movies, music, and digital media',
    image: '/images/categories/books-media.jpg',
    is_active: true,
    products_count: 4
  },
  {
    id: 6,
    name: 'Beauty & Health',
    slug: 'beauty-health',
    description: 'Cosmetics, skincare, and health products',
    image: '/images/categories/beauty-health.jpg',
    is_active: true,
    products_count: 9
  }
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
    if (httpMethod === 'GET') {
      // Parse the path to check if requesting specific category
      const pathSegments = path.split('/').filter(segment => segment);
      const lastSegment = pathSegments[pathSegments.length - 1];
      
      // Check if requesting a specific category by slug
      if (lastSegment !== 'categories') {
        const category = categories.find(c => c.slug === lastSegment);
        if (category) {
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(category)
          };
        } else {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Category not found' })
          };
        }
      }

      // Return all categories
      let filteredCategories = [...categories];

      // Apply filters if provided
      if (queryStringParameters) {
        const { name, is_active } = queryStringParameters;
        
        if (name) {
          const searchTerm = name.toLowerCase();
          filteredCategories = filteredCategories.filter(c =>
            c.name.toLowerCase().includes(searchTerm) ||
            c.description.toLowerCase().includes(searchTerm)
          );
        }
        
        if (is_active !== undefined) {
          const activeFilter = is_active === 'true';
          filteredCategories = filteredCategories.filter(c => c.is_active === activeFilter);
        }
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          count: filteredCategories.length,
          results: filteredCategories
        })
      };
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
