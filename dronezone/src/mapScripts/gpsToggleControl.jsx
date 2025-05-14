import "leaflet/dist/leaflet.css";
import { MdMyLocation } from "react-icons/md";
import { useSelector } from "react-redux";
import { useMap } from "react-leaflet";

// GPS Toggle Control

/**
 * A Leaflet map control that recenters the map at the current location.
 *
 * Displays a button with a location icon. When clicked, it calls `centerPosition`
 * to recenter the map.
 *
 * @returns {JSX.Element} A styled Leaflet map control button
 */

function GPSToggleControl() {
  const map = useMap();
  const { position } = useSelector((state) => state.gpsPos);

  function centerPosition() {
    map.flyTo(position, map.getZoom());
  }

  return (
    <div className="absolute top-[80px] left-[12px] z-1000 leaflet-control" >
      <button
        onClick={() => centerPosition()}
        className="bg-white p-[4px] rounded-sm border-2 hover:bg-gray-100" >
        <MdMyLocation size={20} />
      </button>
    </div>
  );
}

export default GPSToggleControl;
