import React from 'react';
import { useFlightMode } from './inFlightContext';

export function EndFlightButton({ onClick }) {
  const { toggleMode } = useFlightMode();

  const handleClick = () => {
    toggleMode();
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '3px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000
      }}
    >
      <button
        className="bg-red-600 text-white font-bold text-lg md:text-2xl pt-[10px] pb-[10px] pr-[20px] md:pr-[55px] pl-[20px] md:pl-[55px]
         rounded-xl boarder-none hover:scale-107 transition-all duration-200 whitespace-nowrap shadow-sm"
        onClick={handleClick}
      >
        End Flight
      </button>
    </div>
  );
}