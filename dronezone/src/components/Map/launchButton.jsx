import { useState } from 'react';

// ---------------- Context Import -------------------
import { InFlightProvider, useFlightMode } from './inFlightContext';


export function LaunchButton() {
  
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
      <button
        style={{
          backgroundColor: '#1D4ED8',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '30px',
          padding: '10px 55px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          border: 'none',
          cursor: 'pointer'
        }}
        onClick={toggleMode}
      >
        {flightMode === 'drawFlightMode' ? 'Launch' : 'In Flight'}
      </button>
    </div>
  );
}