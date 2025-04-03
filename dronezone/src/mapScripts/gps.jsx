import { useEffect, useState } from 'react';
import { Marker, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

/*
    Tracks the users location and adds a marker at their position
*/
const LocationTracker = ({ trackingEnabled }) => {
    const map = useMap();
    const [position, setPosition] = useState(null);
    const [accuracy, setAccuracy] = useState(null);
    const [watchId, setWatchId] = useState(null);
    const [mapCentered, setMapCentered] = useState(false);
  
    useEffect(() => {
      // Start or stop tracking based on the trackingEnabled prop
      if (trackingEnabled) {
        if (!navigator.geolocation) {
          console.log("Your browser does not support geolocation!");
          return;
        }
  
        const id = navigator.geolocation.watchPosition(
          (pos) => {
            const newPos = [pos.coords.latitude, pos.coords.longitude];
            setPosition(newPos);
            setAccuracy(pos.coords.accuracy);
            
            // Center map if it has not already been centered
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
            maximumAge: 10000,
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
            {accuracy && (
              <Circle
                center={position}
                radius={accuracy}
                color="blue"
                fillColor="blue"
                fillOpacity={0.2}
              />
            )}
          </>
        )}
      </>
    );
  };
  
/*
    Control component used to toggle location tracking.
*/
const GPSToggleControl = ({ trackingEnabled, toggleTracking }) => {
    return (
      <div className="gps-control" style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 1000,
      }}>
        <button 
          onClick={toggleTracking}
          style={{
            padding: '8px 16px',
            backgroundColor: trackingEnabled ? '#f44336' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          }}
        >
          {trackingEnabled ? 'Stop GPS Tracking' : 'Start GPS Tracking'}
        </button>
      </div>
    );
  };

export { LocationTracker, GPSToggleControl };