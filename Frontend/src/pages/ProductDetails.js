import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import '../styles/ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart, getCartItem } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const product = getProductById(id);
  const cartItem = getCartItem(parseInt(id));
  const isInCart = !!cartItem;

  if (!product) {
    return (
      <div className="product-details">
        <div className="container">
          <div className="product-not-found">
            <h1>Product Not Found</h1>
            <p>The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/products" className="btn btn-primary">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
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

  const images = product.images || [product.image];

  return (
    <div className="product-details">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="separator">&gt;</span>
          <Link to="/products">Products</Link>
          <span className="separator">&gt;</span>
          <span className="current">{product.name}</span>
        </nav>

        <div className="product-content">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img 
                src={images[selectedImage]} 
                alt={product.name}
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/500x500?text=${encodeURIComponent(product.name)}`;
                }}
              />
              {!product.inStock && (
                <div className="out-of-stock-overlay">
                  <span>Out of Stock</span>
                </div>
              )}
            </div>
            
            {images.length > 1 && (
              <div className="image-thumbnails">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/100x100?text=${index + 1}`;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-category">
              <Link to={`/products?category=${product.category.toLowerCase()}`}>
                {product.category}
              </Link>
            </div>
            
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-rating">
              <div className="stars">
                {renderStars(product.rating)}
              </div>
              <span className="rating-text">
                ({product.rating}) • {product.reviews || 0} reviews
              </span>
            </div>

            <div className="product-pricing">
              <span className="current-price">{formatPrice(product.price)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="original-price">{formatPrice(product.originalPrice)}</span>
                  <span className="discount">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            {product.specs && (
              <div className="product-specs">
                <h3>Specifications</h3>
                <div className="specs-grid">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="spec-item">
                      <span className="spec-label">{key}:</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="product-actions">
              <div className="quantity-selector">
                <label htmlFor="quantity">Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max="10"
                  />
                  <button 
                    type="button"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  className="btn btn-primary btn-large"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  {isInCart ? `Update Cart (${cartItem?.quantity || 0})` : 'Add to Cart'}
                </button>
                
                <button 
                  className="btn btn-success btn-large"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                >
                  Buy Now
                </button>
              </div>

              {!product.inStock && (
                <div className="stock-status out-of-stock">
                  ❌ Currently out of stock
                </div>
              )}
              
              {product.inStock && (
                <div className="stock-status in-stock">
                  ✅ In stock and ready to ship
                </div>
              )}
            </div>

            <div className="product-features">
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="feature">
                <span className="feature-icon">↩️</span>
                <span>30-day return policy</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🔒</span>
                <span>Secure payment</span>
              </div>
              <div className="feature">
                <span className="feature-icon">⭐</span>
                <span>Customer support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
