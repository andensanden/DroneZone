import React, { createContext, useState, useContext } from 'react';

// Create a context for zones
const ZonesContext = createContext();

// Create a provider component
export const ZonesProvider = ({ children }) => {
  const [zones, setZones] = useState([]);

  // Update zone at a specific index
  const updateZone = (index, newZone) => {
    setZones((prevZones) => {
      const updatedZones = [...prevZones];
      updatedZones[index] = newZone;
      return updatedZones;
    });
  };

  // Add a new zone
  const addZone = (newZone) => {
    setZones((prevZones) => [...prevZones, newZone]);
  };

  return (
    <ZonesContext.Provider value={{ zones, setZones, updateZone, addZone }}>
      {children}
    </ZonesContext.Provider>
  );
};

// Custom hook to use the ZonesContext
export const useZones = () => useContext(ZonesContext);