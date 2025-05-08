import { useEffect, useState } from 'react';
import { Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { setPosition } from '@/Redux/gpsPos/gpsPosSlice';
import { useSelector, useDispatch } from 'react-redux';
import { droneClient } from './dronepathHandler';



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

          updatePositionInDatabase(newPos, userID);

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
          <Marker position={position} />
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