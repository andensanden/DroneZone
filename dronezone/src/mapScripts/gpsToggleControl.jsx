import 'leaflet/dist/leaflet.css';
import {VscPerson} from "react-icons/vsc"

// GPS Toggle Control

/**
 * A Leaflet map control that toggles GPS location tracking.
 *
 * Displays a button with a person icon. When clicked, it calls `toggleTracking`
 * to either enable or disable GPS-based user location tracking.
 *
 * @param {{ trackingEnabled: boolean, toggleTracking: () => void }} props - Component props
 * @param {boolean} props.trackingEnabled - Indicates whether GPS tracking is currently enabled
 * @param {Function} props.toggleTracking - Function to toggle the GPS tracking state
 * @returns {JSX.Element} A styled Leaflet map control button
 */

function GPSToggleControl({ trackingEnabled, toggleTracking }) {
    return (
      <div className="leaflet-bar leaflet-control" style={{ position: 'absolute', top: '20%', left: '0.5%', zIndex: 1000, pointerEvents: 'auto', }}>
        <button
          onClick={toggleTracking}
          style={{
            backgroundColor: trackingEnabled ? '#fff' : '#fff',
            padding: '8px',
            border: '2px solid rgba(0,0,0,0.2)',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          <VscPerson size={24}/>
        </button>
      </div>
    );
}

export default GPSToggleControl;