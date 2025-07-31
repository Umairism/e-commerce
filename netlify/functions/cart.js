// Netlify Function for cart API
// In a real application, you would use a database
// For now, we'll use a simple in-memory storage with session simulation

let carts = new Map(); // session_id -> cart data

exports.handler = async (event, context) => {
  const { httpMethod, path, queryStringParameters, body, headers } = event;
  
  // Add CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  try {
    // Simple session handling - in production, use proper session management
    const sessionId = headers['x-session-id'] || 'default-session';
    
    // Initialize cart if it doesn't exist
    if (!carts.has(sessionId)) {
      carts.set(sessionId, {
        id: sessionId,
        items: [],
        total_items: 0,
        total_price: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }

    const cart = carts.get(sessionId);
    
    // Parse the path to determine the action
    const pathSegments = path.split('/').filter(segment => segment);
    const action = pathSegments[pathSegments.length - 1];

    if (httpMethod === 'GET' && action === 'cart') {
      // Get cart
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(cart)
      };
    }

    if (httpMethod === 'POST' && action === 'add') {
      // Add to cart
      const { product_id, quantity = 1 } = JSON.parse(body);
      
      // Mock product data (in real app, fetch from database)
      const products = {
        1: { id: 1, name: 'iPhone 15 Pro', price: 999.99, image: '/images/products/iphone-15-pro.jpg' },
        2: { id: 2, name: 'Samsung Galaxy S24 Ultra', price: 1199.99, image: '/images/products/samsung-galaxy-s24.jpg' },
        3: { id: 3, name: 'MacBook Pro 14-inch', price: 1999.99, image: '/images/products/macbook-pro-14.jpg' },
        4: { id: 4, name: 'Classic Denim Jacket', price: 79.99, image: '/images/products/denim-jacket.jpg' },
        5: { id: 5, name: 'Running Sneakers', price: 129.99, image: '/images/products/running-sneakers.jpg' },
        6: { id: 6, name: 'Modern Coffee Table', price: 299.99, image: '/images/products/coffee-table.jpg' }
      };

      const product = products[product_id];
      if (!product) {
        return {
          statusCode: 404,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Product not found' })
        };
      }

      // Check if item already exists in cart
      const existingItemIndex = cart.items.findIndex(item => item.product === product_id);
      
      if (existingItemIndex >= 0) {
        // Update quantity
        cart.items[existingItemIndex].quantity += quantity;
        cart.items[existingItemIndex].total_price = cart.items[existingItemIndex].quantity * product.price;
      } else {
        // Add new item
        const newItem = {
          id: Date.now(),
          product: product_id,
          product_name: product.name,
          product_price: product.price,
          product_image: product.image,
          quantity: quantity,
          total_price: product.price * quantity
        };
        cart.items.push(newItem);
      }

      // Recalculate totals
      cart.total_items = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      cart.total_price = cart.items.reduce((sum, item) => sum + item.total_price, 0);
      cart.updated_at = new Date().toISOString();

      carts.set(sessionId, cart);

      return {
        statusCode: 201,
        headers: corsHeaders,
        body: JSON.stringify(cart)
      };
    }

    if (httpMethod === 'PUT' && pathSegments.includes('item')) {
      // Update cart item
      const itemId = parseInt(pathSegments[pathSegments.length - 1]);
      const { quantity } = JSON.parse(body);

      const itemIndex = cart.items.findIndex(item => item.id === itemId);
      if (itemIndex === -1) {
        return {
          statusCode: 404,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Cart item not found' })
        };
      }

      if (quantity <= 0) {
        // Remove item
        cart.items.splice(itemIndex, 1);
      } else {
        // Update quantity
        cart.items[itemIndex].quantity = quantity;
        cart.items[itemIndex].total_price = cart.items[itemIndex].product_price * quantity;
      }

      // Recalculate totals
      cart.total_items = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      cart.total_price = cart.items.reduce((sum, item) => sum + item.total_price, 0);
      cart.updated_at = new Date().toISOString();

      carts.set(sessionId, cart);

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(cart)
      };
    }

    if (httpMethod === 'DELETE' && pathSegments.includes('item')) {
      // Remove cart item
      const itemId = parseInt(pathSegments[pathSegments.length - 2]); // remove is last segment

      const itemIndex = cart.items.findIndex(item => item.id === itemId);
      if (itemIndex === -1) {
        return {
          statusCode: 404,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Cart item not found' })
        };
      }

      cart.items.splice(itemIndex, 1);

      // Recalculate totals
      cart.total_items = cart.items.reduce((sum, item) => sum + item.quantity, 0);
      cart.total_price = cart.items.reduce((sum, item) => sum + item.total_price, 0);
      cart.updated_at = new Date().toISOString();

      carts.set(sessionId, cart);

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(cart)
      };
    }

    if (httpMethod === 'DELETE' && action === 'clear') {
      // Clear cart
      cart.items = [];
      cart.total_items = 0;
      cart.total_price = 0;
      cart.updated_at = new Date().toISOString();

      carts.set(sessionId, cart);

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(cart)
      };
    }

    return {
      statusCode: 404,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Endpoint not found' })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Internal server error', message: error.message })
    };
  }
};
