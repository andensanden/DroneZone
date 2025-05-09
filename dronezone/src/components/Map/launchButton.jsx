import React from 'react';
import { useFlightMode } from './inFlightContext'; // Adjust the path as necessary
import { EndFlightButton } from './endFlightButton';
import { useSelector } from 'react-redux';

export function LaunchButton({ onLaunchClick, onEndClick }) {
  const { flightMode, toggleMode } = useFlightMode();
  const { currentDeviceID } = useSelector((state) => state.gpsPos);

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

      {currentDeviceID && (flightMode === 'drawFlightMode' ? <ButtonStart onClick={onLaunchClick} toggleMode={toggleMode}/> 
                  : <EndFlightButton onClick={onEndClick}/>)}
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
        className="bg-primary-blue text-white font-bold text-xl md:text-3xl pt-[10px] shadow-sm
         px-[20px] py-[10px] md:px-[55px] rounded-xl boarder-none hover:scale-107 transition-all duration-200"
        onClick={handleClick}
      >
        Launch
      </button>
  );
}