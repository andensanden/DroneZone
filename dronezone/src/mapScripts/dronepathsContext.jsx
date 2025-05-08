import React, { createContext, useState, useContext } from "react";

// Creates the DronepathsContext to share state across components.
const DronepathsContext = createContext();

/**
 * Provider component to manage and share drone paths state.
 * 
 *  */ 
export function DronepathsProvider({ children }) {
  const [dronepaths, setDronepaths] = useState([]);

    // Clears all drone paths from the state.
  const clearDronepaths = () => {
    setDronepaths([]);
  };

    // Adds a new drone path to the state.
  const addDronepath = (newDronepath) => {
    setDronepaths(prevDronepaths => [...prevDronepaths, newDronepath]);
  };

  return (
    <DronepathsContext.Provider value={{ dronepaths, setDronepaths, addDronepath, clearDronepaths }}>
      {children}
    </DronepathsContext.Provider>
  );
}

export const useDronepaths = () => useContext(DronepathsContext);