// API service for connecting to Netlify Functions backend
const API_BASE_URL = process.env.REACT_APP_API_URL || '/.netlify/functions';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.sessionId = this.getOrCreateSessionId();
  }

  getOrCreateSessionId() {
    let sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  }

  async request(endpoint, options = {}) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'X-Session-ID': this.sessionId,
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Categories
  async getCategories() {
    return this.request('/categories');
  }

  // Products
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/products${queryString ? `?${queryString}` : ''}`);
  }

  async getFeaturedProducts() {
    return this.request('/products/featured');
  }

  async getProduct(slug) {
    return this.request(`/products/${slug}`);
  }

  async searchProducts(query, filters = {}) {
    const params = { q: query, ...filters };
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/products?${queryString}`);
  }

  // Cart
  async getCart() {
    return this.request('/cart');
  }

  async addToCart(productId, quantity = 1) {
    return this.request('/cart/add', {
      method: 'POST',
      body: { product_id: productId, quantity },
    });
  }

  async updateCartItem(itemId, quantity) {
    return this.request(`/cart/item/${itemId}`, {
      method: 'PUT',
      body: { quantity },
    });
  }

  async removeFromCart(itemId) {
    return this.request(`/cart/item/${itemId}/remove`, {
      method: 'DELETE',
    });
  }

  async clearCart() {
    return this.request('/cart/clear', {
      method: 'DELETE',
    });
  }

  // Orders (mock implementation for now)
  async getOrders() {
    // Mock implementation - in a real app, this would be a separate function
    return { results: [] };
  }

  async createOrder(orderData) {
    // Mock implementation - in a real app, this would be a separate function
    return { 
      id: Date.now(),
      order_number: 'ORD' + Date.now(),
      ...orderData,
      status: 'pending'
    };
  }

  async getOrder(orderNumber) {
    // Mock implementation
    return { order_number: orderNumber, status: 'pending' };
  }

  // Reviews (mock implementation for now)
  async getProductReviews(productSlug) {
    // Mock implementation
    return { results: [] };
  }

  async addProductReview(productSlug, reviewData) {
    // Mock implementation
    return { 
      id: Date.now(),
      ...reviewData,
      created_at: new Date().toISOString()
    };
  }
}

const apiService = new ApiService();
export default apiService;
