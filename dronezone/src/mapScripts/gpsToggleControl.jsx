import "leaflet/dist/leaflet.css";
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
    <div className="absolute top-[80px] left-[12px] z-1000 leaflet-control" >
      <button
        onClick={toggleTracking}
        className="bg-white p-[4px] rounded-sm border-2" >
        <MdMyLocation size={20} />
      </button>
    </div>
  );
}

export default GPSToggleControl;
