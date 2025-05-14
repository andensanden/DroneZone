import React from "react";
import { useFlightMode } from "./inFlightContext";

// Komponent för att avsluta en pågående flygning
export function EndFlightButton({ onClick }) {
  const { toggleMode } = useFlightMode();

  const handleClick = () => {
    toggleMode(); // Växla flightMode (t.ex. "inFlight" → "drawFlight")
    if (onClick) {
      onClick(); // Kör eventuell extern funktion (t.ex. stänga paneler eller spara flygdata)
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: "3px",
        left: "50%", // Centrerad horisontellt
        transform: "translateX(-50%)",
        zIndex: 1000, // Ser till att knappen ligger ovanpå andra element
      }}
    >
      <button
        className="bg-red-600 text-white font-bold text-lg md:text-2xl px-[20px] py-[10px] md:px-[55px]
         rounded-xl boarder-none hover:scale-107 transition-all duration-200 whitespace-nowrap shadow-sm"
        onClick={handleClick}
      >
        End Flight
      </button>
    </div>
  );
}
