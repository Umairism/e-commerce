import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import ApiService from '../services/api';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart reducer for complex state management
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items || [],
        totalItems: action.payload.total_items || 0,
        totalPrice: parseFloat(action.payload.total_price || 0),
        loading: false
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
        loading: false
      };

    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0
      };

    default:
      return state;
  }
};

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  loading: false,
  error: null
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const loadCartFromStorage = useCallback(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch (error) {
      console.error('Failed to load cart from storage:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const loadCart = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const cartData = await ApiService.getCart();
      dispatch({ type: 'SET_CART', payload: cartData });
    } catch (error) {
      console.warn('API cart loading failed, using localStorage:', error);
      loadCartFromStorage();
    }
  }, [loadCartFromStorage]);

  const saveCartToStorage = useCallback(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(state.items));
    } catch (error) {
      console.error('Failed to save cart to storage:', error);
    }
  }, [state.items]);

  // Load cart on mount
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (!state.loading && state.items.length >= 0) {
      saveCartToStorage();
    }
  }, [state.items, state.loading, saveCartToStorage]);

  const addToCart = async (product) => {
    try {
      const cartData = await ApiService.addToCart(product.id, 1);
      dispatch({ type: 'SET_CART', payload: cartData });
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.warn('API add to cart failed, using local storage:', error);
      // Fallback to local storage
      dispatch({ type: 'ADD_TO_CART', payload: product });
      toast.success(`${product.name} added to cart!`);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const cartData = await ApiService.removeFromCart(itemId);
      dispatch({ type: 'SET_CART', payload: cartData });
      toast.success('Item removed from cart');
    } catch (error) {
      console.warn('API remove from cart failed, using local storage:', error);
      // Fallback to local storage
      dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
      toast.success('Item removed from cart');
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      if (quantity === 0) {
        return removeFromCart(itemId);
      }
      const cartData = await ApiService.updateCartItem(itemId, quantity);
      dispatch({ type: 'SET_CART', payload: cartData });
    } catch (error) {
      console.warn('API update quantity failed, using local storage:', error);
      // Fallback to local storage
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
    }
  };

  const clearCart = async () => {
    try {
      await ApiService.clearCart();
      dispatch({ type: 'CLEAR_CART' });
      toast.success('Cart cleared');
    } catch (error) {
      console.warn('API clear cart failed, using local storage:', error);
      // Fallback to local storage
      dispatch({ type: 'CLEAR_CART' });
      toast.success('Cart cleared');
    }
  };

  const getCartItemCount = () => {
    if (state.totalItems > 0) {
      return state.totalItems;
    }
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    if (state.totalPrice > 0) {
      return state.totalPrice;
    }
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const isInCart = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  const getCartItem = (productId) => {
    return state.items.find(item => item.id === productId);
  };

  // Export cartItems for backward compatibility
  const cartItems = state.items;

  const value = {
    cartItems,
    items: state.items, // Keep both for compatibility
    totalItems: getCartItemCount(),
    totalPrice: getCartTotal(),
    loading: state.loading,
    error: state.error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
    getCartTotal,
    isInCart,
    getCartItem,
    refreshCart: loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
