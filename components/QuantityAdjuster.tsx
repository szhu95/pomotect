"use client";
import React, { useState, useEffect } from 'react';
import localFont from 'next/font/local';

const pomotectFont = localFont({
  src: '../fonts/pomotect-analog-regular.otf',
});

interface QuantityAdjusterProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  isLoading?: boolean;
}

export default function QuantityAdjuster({ quantity, onQuantityChange, isLoading = false }: QuantityAdjusterProps) {
  const [displayQuantity, setDisplayQuantity] = useState(quantity);
  const [isAnimating, setIsAnimating] = useState(false);

  // Update display quantity when prop changes
  useEffect(() => {
    if (quantity !== displayQuantity) {
      setIsAnimating(true);
      setDisplayQuantity(quantity);
      // Reset animation state after animation completes
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [quantity, displayQuantity]);

  const handleIncrement = () => {
    if (!isLoading) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (!isLoading && quantity > 1) {
      onQuantityChange(quantity - 1);
    } else if (quantity === 1) {
      onQuantityChange(0); // Remove item
    }
  };

  return (
    <div className={`flex items-center space-x-1 md:space-x-2 ${pomotectFont.className}`}>
      {/* Decrease Button */}
      <button
        onClick={handleDecrement}
        disabled={isLoading}
        className={`w-5 h-5 md:w-6 md:h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${pomotectFont.className} ${
          quantity <= 1 ? 'text-red-500 hover:bg-red-50' : 'text-gray-700'
        }`}
        aria-label="Decrease quantity"
      >
        <svg width="10" height="10" className="md:w-3 md:h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M20 12H4"/>
        </svg>
      </button>

      {/* Quantity Display with Animation */}
      <div className="relative min-w-[1.5rem] md:min-w-[2rem] h-5 md:h-6 flex items-center justify-center">
        <span 
          className={`text-center ${pomotectFont.className} transition-all duration-300 ease-out ${
            isAnimating ? 'text-terracotta' : ''
          } ${isLoading ? 'opacity-50' : ''}`}
        >
          {displayQuantity}
        </span>
      </div>

      {/* Increase Button */}
      <button
        onClick={handleIncrement}
        disabled={isLoading}
        className={`w-5 h-5 md:w-6 md:h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-gray-700 ${pomotectFont.className}`}
        aria-label="Increase quantity"
      >
        <svg width="10" height="10" className="md:w-3 md:h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 4v16m8-8H4"/>
        </svg>
      </button>
    </div>
  );
} 