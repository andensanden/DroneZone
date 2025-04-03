import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MapClick from '@/mapScripts/pathDrawing';

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationTracker = ({ trackingEnabled }) => {
  const map = useMap();
  const [position, setPosition] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [watchId, setWatchId] = useState(null);

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
          
          // Optionally center map on new position
          map.flyTo(newPos, map.getZoom());
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
      // We don't clear position to keep the last known location visible
    }
  }, [trackingEnabled, map]);

  return (
    <>
      {position && (
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

// Control component to be placed outside of the map
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

const Map = () => {
  const initialPosition = [59.3293, 18.0686]; // Stockholm coordinates
  const [trackingEnabled, setTrackingEnabled] = useState(true);

  const toggleTracking = () => {
    setTrackingEnabled(prev => !prev);
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <GPSToggleControl 
        trackingEnabled={trackingEnabled} 
        toggleTracking={toggleTracking} 
      />
      <MapContainer 
        center={initialPosition} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <LocationTracker trackingEnabled={trackingEnabled} />
        <MapClick/>
      </MapContainer>
    </div>
  );
};

export default Map;