import React, { createContext, useContext, useState } from 'react';
  
// ---------------- CREATE CONTEXT FOR IN FLIGHT ----------------

const InFlightModeContext = createContext();

export const InFlightProvider = ({ launchbutton }) => {
    const [flightMode, setFlightMode] = useState('drawFlightMode');
  
    const toggleMode = () => {
        setFlightMode((prevMode) => (prevMode === 'drawFlightMode' ? 'inFlightMode': 'drawFlightMode'));
    };

    return (
        <InFlightModeContext.Provider value={{ flightMode, toggleMode}}>
            {launchbutton}
        </InFlightModeContext.Provider>
    );
};

export const useFlightMode = () => useContext(InFlightModeContext);