import { useEffect, useState, useMemo, useRef } from 'react';
import { Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { setPosition } from '@/Redux/gpsPos/gpsPosSlice';
import { useSelector, useDispatch } from 'react-redux';
import { droneClient } from './dronepathHandler.js';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';



/**
 * Method for tracking user's location.
 * @param {boolean} trackingEnabled - Whether to track user's location 
 * @returns {JSX.Element} - Return a marker at given position
 * 
 */
function LocationTracker({ trackingEnabled }) {
  const map = useMap();
  const dispatch = useDispatch();
  const { position } = useSelector((state) => state.gpsPos);
  const [watchId, setWatchId] = useState(null);
  const [mapCentered, setMapCentered] = useState(false);
  const { userID } = useSelector((state) => state.auth);
  const previousPosition = useRef(null);
  
  const [heading, setHeading] = useState(null);

    useEffect(() => {
    const handleOrientation = (event) => {
      if (event.alpha !== null&& !isNaN(event.alpha)) {
        setHeading(event.alpha);
      }else {
        setHeading(null); // fallback if not available
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  const locationIcon = useMemo(() => L.divIcon({
    html: ReactDOMServer.renderToString(
      <div style={{
        position: 'relative',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Direction cone (rotates based on heading) */}
        {heading !== null && !isNaN(heading) && (
        <div style={{
          position: 'absolute',
          top: '-30px',
          left: '50%',
          transform: `translateX(-50%) rotate(${heading}deg)`,
          transformOrigin: 'bottom center',
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderBottom: '30px solid rgba(59, 130, 246, 0.3)',
        }} />
)}
        {/* Glowing outer circle (with animation) */}
        <div style={{
          position: 'absolute',
          width: '34px',
          height: '34px',
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderRadius: '70%',
          animation: 'pulse 2s infinite ease-in-out',
        }} />

        {/* Solid blue center dot */}
        <div style={{
          width: '22px',
          height: '22px',
          backgroundColor: '#2137F8',
          border: '2px solid white',
          borderRadius: '50%',
          zIndex: 1,
        }} />

        {/* Pulse keyframes as embedded <style> */}
        <style>{`
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.4);
              opacity: 0.1;
            }
            100% {
              transform: scale(1);
              opacity: 0.6;
            }
          }
        `}</style>
      </div>
    ),
    className: '',
    iconAnchor: [20, 20],
  }), [heading]);

  useEffect(() => {
    // Start or stop tracking based on the trackingEnabled prop
    if (trackingEnabled) {

      if (!navigator.geolocation) {
        console.log("Your browser does not support geolocation!");
        return;
      }

      // Get Position and update it
      const id = navigator.geolocation.watchPosition(
        (pos) => {
          const newPos = [pos.coords.latitude, pos.coords.longitude];
          dispatch(setPosition(newPos));
          
          
          
          if (!previousPosition.current || previousPosition.current[0] !== newPos[0]|| previousPosition.current[1] !== newPos[1]
          ) {
        
            updatePositionInDatabase(newPos, userID);
            previousPosition.current = newPos; // Update the previous position
          } else {
            console.log("Position is the same, not updating.");
          }

          if (!mapCentered) {
            map.flyTo(newPos, map.getZoom());
            setMapCentered(true);
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 15000
        }
      );

      setWatchId(id);

      return () => {
        if (id) {
          navigator.geolocation.clearWatch(id);
        }
      };
    } else if (watchId) {
      // Clear the watch when tracking is disabled
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setMapCentered(false);
      // We don't clear position to keep the last known location visible
    }
  }, [trackingEnabled, map, mapCentered]);

  return (
    <>
      {trackingEnabled && position && (
        <>
          <Marker position={position} icon={locationIcon}/>
        </>
      )}
    </>
  );
}

function updatePositionInDatabase(newPos, userID) {

  if (droneClient) {
    const posJSON = JSON.stringify(newPos);
    droneClient.updatePosition(posJSON, userID);
  }
}

export default LocationTracker;