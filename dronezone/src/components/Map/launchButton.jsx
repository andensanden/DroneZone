import React from 'react';
import { useFlightMode } from './inFlightContext'; // Adjust the path as necessary
import { EndFlightButton } from './endFlightButton';

export function LaunchButton({ onLaunchClick, onEndClick }) {
  const { flightMode, toggleMode } = useFlightMode();

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

      {flightMode === 'drawFlightMode' ? <ButtonStart onClick={onLaunchClick} toggleMode={toggleMode}/> 
                  : <EndFlightButton onClick={onEndClick}/>}
    </div>
  );
}

function ButtonStart({onClick, toggleMode}) {
  const handleClick = () => {
    toggleMode();
    if (onClick) {
      onClick();
    }
  };

  return(
  <button
        className="bg-primary-blue text-white font-bold text-xl md:text-3xl pt-[10px] pb-[10px] pr-[20px] md:pr-[55px] pl-[20px] md:pl-[55px] rounded-xl boarder-none hover:scale-107 transition-all duration-200"
        onClick={handleClick}
      >
        Launch
      </button>
  );
}