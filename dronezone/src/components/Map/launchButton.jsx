import React from 'react';
import { useFlightMode } from './inFlightContext'; // Adjust the path as necessary

export function LaunchButton({ onClick }) {
  const { flightMode, toggleMode } = useFlightMode();

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
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000
      }}
    >
      <button className="bg-primary-blue text-white font-bold text-xl md:text-3xl pt-[10px] pb-[10px] pr-[20px] md:pr-[55px] pl-[20px] md:pl-[55px] rounded-xl boarder-none cursor-pointer"
        
        onClick={handleClick}
      >
        {flightMode === 'drawFlightMode' ? 'Launch' : 'In Flight'}
      </button>
    </div>
  );
}
