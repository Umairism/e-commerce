import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import '../styles/ProductCard.css';

function ProductCard({ product, viewMode = 'grid' }) {
  const { addToCart, getCartItem } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const cartItem = getCartItem(product.id);
  const isInCart = !!cartItem;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star">☆</span>);
      }
    }
    return stars;
  };

  if (viewMode === 'list') {
    return (
      <div className="product-card list-view">
        <Link to={`/product/${product.id}`} className="product-link">
          <div className="product-image-container">
            {!imageLoaded && !imageError && (
              <div className="image-placeholder">
                <div className="loading-spinner"></div>
              </div>
            )}
            {imageError ? (
              <div className="image-placeholder">
                <span>📦</span>
              </div>
            ) : (
              <img
                src={product.image}
                alt={product.name}
                className={`product-image ${imageLoaded ? 'loaded' : ''}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            )}
            {product.originalPrice > product.price && (
              <div className="discount-badge">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </div>
            )}
          </div>
          
          <div className="product-info">
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              
              <div className="product-rating">
                <div className="stars">
                  {renderStars(product.rating)}
                </div>
                <span className="rating-text">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              
              <div className="product-category">
                <span className="category-tag">{product.category}</span>
              </div>
            </div>
            
            <div className="product-actions">
              <div className="price-container">
                {product.originalPrice > product.price && (
                  <span className="original-price">{formatPrice(product.originalPrice)}</span>
                )}
                <span className="current-price">{formatPrice(product.price)}</span>
              </div>
              
              <button
                onClick={handleAddToCart}
                className={`add-to-cart-btn ${isInCart ? 'in-cart' : ''}`}
                disabled={!product.inStock}
              >
                {!product.inStock ? '🚫 Out of Stock' : 
                 isInCart ? `✓ In Cart (${cartItem.quantity})` : '🛒 Add to Cart'}
              </button>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="product-card grid-view">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          {!imageLoaded && !imageError && (
            <div className="image-placeholder">
              <div className="loading-spinner"></div>
            </div>
          )}
          {imageError ? (
            <div className="image-placeholder">
              <span>📦</span>
            </div>
          ) : (
            <img
              src={product.image}
              alt={product.name}
              className={`product-image ${imageLoaded ? 'loaded' : ''}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
          {product.originalPrice > product.price && (
            <div className="discount-badge">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </div>
          )}
          {product.featured && (
            <div className="featured-badge">⭐ Featured</div>
          )}
        </div>
        
        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <h3 className="product-name">{product.name}</h3>
          
          <div className="product-rating">
            <div className="stars">
              {renderStars(product.rating)}
            </div>
            <span className="rating-text">({product.reviews})</span>
          </div>
          
          <div className="price-container">
            {product.originalPrice > product.price && (
              <span className="original-price">{formatPrice(product.originalPrice)}</span>
            )}
            <span className="current-price">{formatPrice(product.price)}</span>
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          className={`add-to-cart-btn ${isInCart ? 'in-cart' : ''}`}
          disabled={!product.inStock}
        >
          {!product.inStock ? '🚫 Out of Stock' : 
           isInCart ? `✓ In Cart (${cartItem.quantity})` : '🛒 Add to Cart'}
        </button>
      </Link>
    </div>
  );
}

export default ProductCard;
