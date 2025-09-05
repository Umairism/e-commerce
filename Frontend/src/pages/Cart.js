import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import '../styles/Cart.css';

function Cart() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal, 
    getCartItemsCount 
  } = useCart();

  const cartTotal = getCartTotal();
  const itemsCount = getCartItemsCount();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h1>Your Cart is Empty</h1>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products" className="btn btn-primary btn-large">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{itemsCount} {itemsCount === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/120x120?text=${encodeURIComponent(item.name)}`;
                    }}
                  />
                </div>
                
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-category">{item.category}</p>
                  <div className="item-rating">
                    <span className="stars">
                      {'★'.repeat(Math.floor(item.rating))}
                      {'☆'.repeat(5 - Math.floor(item.rating))}
                    </span>
                    <span className="rating-text">({item.rating})</span>
                  </div>
                </div>

                <div className="item-price">
                  <span className="price">{formatPrice(item.price)}</span>
                </div>

                <div className="item-quantity">
                  <label htmlFor={`quantity-${item.id}`}>Qty:</label>
                  <div className="quantity-controls">
                    <button 
                      type="button"
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      id={`quantity-${item.id}`}
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                      min="1"
                      className="quantity-input"
                    />
                    <button 
                      type="button"
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="item-total">
                  <span className="total-price">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>

                <div className="item-actions">
                  <button 
                    type="button"
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h2>Order Summary</h2>
              
              <div className="summary-line">
                <span>Subtotal ({itemsCount} items):</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              
              <div className="summary-line">
                <span>Shipping:</span>
                <span>{cartTotal > 50 ? 'FREE' : '$9.99'}</span>
              </div>
              
              <div className="summary-line">
                <span>Tax:</span>
                <span>{formatPrice(cartTotal * 0.08)}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-total">
                <span>Total:</span>
                <span>{formatPrice(cartTotal + (cartTotal > 50 ? 0 : 9.99) + (cartTotal * 0.08))}</span>
              </div>

              {cartTotal > 50 && (
                <div className="free-shipping-notice">
                  🎉 You qualify for FREE shipping!
                </div>
              )}

              <div className="cart-actions">
                <Link to="/checkout" className="btn btn-primary btn-large checkout-btn">
                  Proceed to Checkout
                </Link>
                
                <Link to="/products" className="btn btn-secondary continue-shopping">
                  Continue Shopping
                </Link>
                
                <button 
                  type="button"
                  className="btn btn-danger clear-cart-btn"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>

              <div className="security-badges">
                <div className="badge">🔒 Secure Checkout</div>
                <div className="badge">↩️ Easy Returns</div>
                <div className="badge">🚚 Fast Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
