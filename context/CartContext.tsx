"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface CartContextType {
  cartItemCount: number;
  updateCartItemCount: (count: number) => void;
}

const CartContext = createContext<CartContextType>({
  cartItemCount: 0,
  updateCartItemCount: () => {},
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItemCount, setCartItemCount] = useState(0);

  const updateCartItemCount = useCallback((count: number) => {
    setCartItemCount(count);
    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItemCount', count.toString());
    }
  }, []);

  // Initialize cart count from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCount = localStorage.getItem('cartItemCount');
      if (storedCount) {
        setCartItemCount(parseInt(storedCount, 10));
      }
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartItemCount, updateCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
} 