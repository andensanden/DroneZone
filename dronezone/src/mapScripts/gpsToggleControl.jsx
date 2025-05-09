import "leaflet/dist/leaflet.css";
import { VscPerson } from "react-icons/vsc"; /*person icon, not used any more*/
import { MdMyLocation } from "react-icons/md";

// GPS Toggle Control

/**
 * A Leaflet map control that toggles GPS location tracking.
 *
 * Displays a button with a location icon. When clicked, it calls `toggleTracking`
 * to either enable or disable GPS-based user location tracking.
 *
 * @param {{ trackingEnabled: boolean, toggleTracking: () => void }} props - Component props
 * @param {boolean} props.trackingEnabled - Indicates whether GPS tracking is currently enabled
 * @param {Function} props.toggleTracking - Function to toggle the GPS tracking state
 * @returns {JSX.Element} A styled Leaflet map control button
 */

function GPSToggleControl({ trackingEnabled, toggleTracking }) {
  return (
    <div
      className="leaflet-bar leaflet-control"
      style={{
        position: "absolute",
        top: "14%",
        left: "0.7%",
        zIndex: 1000,
        pointerEvents: "auto",
      }}
    >
      <button
        onClick={toggleTracking}
        style={{
          backgroundColor: trackingEnabled ? "#fff" : "#fff",
          padding: "4px",
          border: "2px solid rgba(0,0,0,0.1)",
          borderRadius: "3px",
          cursor: "pointer",
        }}
      >
        <MdMyLocation size={20} />
      </button>
    </div>
  );
}

export default GPSToggleControl;
