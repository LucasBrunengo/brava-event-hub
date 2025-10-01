import React, { useEffect } from 'react';

interface PaymentConfirmationProps {
  isVisible: boolean;
}

export const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
      <div className="relative">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl animate-pulse">
          <svg 
            className="w-20 h-20 text-purple-600 animate-scale-in" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={3} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <p className="text-white font-semibold text-sm">Payment Confirmed!</p>
        </div>
      </div>
    </div>
  );
};
