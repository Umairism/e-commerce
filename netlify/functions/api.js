// Main API router for Netlify Functions
exports.handler = async (event, context) => {
  const { httpMethod, path } = event;
  
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Session-ID',
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
    // API root endpoint
    if (path === '/.netlify/functions/api' || path === '/api') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: 'E-commerce API is running on Netlify Functions!',
          version: '1.0',
          endpoints: {
            products: '/.netlify/functions/products',
            categories: '/.netlify/functions/categories',
            cart: '/.netlify/functions/cart',
            search: '/.netlify/functions/products?q=search_term'
          },
          status: 'active'
        })
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ 
        error: 'API endpoint not found',
        available_endpoints: [
          '/.netlify/functions/products',
          '/.netlify/functions/categories', 
          '/.netlify/functions/cart'
        ]
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', message: error.message })
    };
  }
};
