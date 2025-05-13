import React, { createContext, useContext, useState } from "react";

// ---------------- CREATE CONTEXT FOR IN FLIGHT ----------------

// Skapar ett nytt kontextobjekt (utan defaultvärde här)
const InFlightModeContext = createContext();

// Provider-komponent som omger de delar av appen som ska ha tillgång till flygläget
export const InFlightProvider = ({ children }) => {
  // Startläge är 'drawFlightMode' (användaren ritar flygvägen)
  const [flightMode, setFlightMode] = useState("drawFlightMode");

  // Växlar läget mellan ritläge och aktivt flygläge
  const toggleMode = () => {
    setFlightMode((prevMode) =>
      prevMode === "drawFlightMode" ? "inFlightMode" : "drawFlightMode"
    );
  };
  // Växlar läget mellan ritläge och aktivt flygläge
  return (
    <InFlightModeContext.Provider value={{ flightMode, toggleMode }}>
      {children}
    </InFlightModeContext.Provider>
  );
};

// Hook för att enkelt hämta flightMode och toggle-funktionen i andra komponenter
export const useFlightMode = () => useContext(InFlightModeContext);
