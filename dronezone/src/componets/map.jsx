// src/components/map.jsx
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MapClick from '@/mapScripts/pathDrawing';
import ForbiddenZoneDrawing from '@/mapScripts/ForbiddenZoneDrawing';

import ForbiddenZonesManager from '@/mapScripts/forbiddenZone';

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// LocationTracker component
const LocationTracker = ({ trackingEnabled }) => {
  const map = useMap();
  const [position, setPosition] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  useEffect(() => {
    if (!trackingEnabled) return;

    let watchId;
    const handleSuccess = (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      const newPos = L.latLng(latitude, longitude);
      setPosition(newPos);
      setAccuracy(accuracy);
      map.flyTo(newPos, 18);
    };

    const handleError = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        handleSuccess,
        handleError,
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [trackingEnabled, map]);

  return position ? (
    <>
      <Marker position={position} />
      {accuracy && <Circle center={position} radius={accuracy} />}
    </>
  ) : null;
};

// GPS Toggle Control
const GPSToggleControl = ({ trackingEnabled, toggleTracking }) => {
  return (
    <div className="leaflet-bar leaflet-control" style={{ marginRight: '10px' }}>
      <button
        onClick={toggleTracking}
        style={{
          backgroundColor: trackingEnabled ? '#4CAF50' : '#fff',
          padding: '8px',
          border: '2px solid rgba(0,0,0,0.2)',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        📍
      </button>
    </div>
  );
};

// Drawing Mode Control
const DrawingModeControl = ({ drawingMode, setDrawingMode }) => {
  return (
    <div className="drawing-mode-control" style={{
      position: 'absolute',
      top: '60px',
      right: '10px',
      zIndex: 1000,
    }}>
      <button 
        onClick={() => setDrawingMode('path')}
        style={{
          padding: '8px 16px',
          backgroundColor: drawingMode === 'path' ? '#4CAF50' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px 0 0 4px',
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        }}
      >
        Draw Path
      </button>
      <button 
        onClick={() => setDrawingMode('forbidden')}
        style={{
          padding: '8px 16px',
          backgroundColor: drawingMode === 'forbidden' ? '#f44336' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '0 4px 4px 0',
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        }}
      >
        Draw Forbidden Zone
      </button>
    </div>
  );
};

// Forbidden Zones Initializer
const ForbiddenZonesInitializer = () => {
  const map = useMap();
  
  useEffect(() => {
    const forbiddenManager = new ForbiddenZonesManager(map);
    map.forbiddenManager = forbiddenManager;
    
    return () => {
      forbiddenManager.clearForbiddenZones();
    };
  }, [map]);

  return null;
};

// Main Map Component
const Map = () => {
  const initialPosition = [59.3293, 18.0686]; // Stockholm coordinates
  const [trackingEnabled, setTrackingEnabled] = useState(true);
  const [drawingMode, setDrawingMode] = useState('path');

  const toggleTracking = () => {
    setTrackingEnabled(prev => !prev);
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <GPSToggleControl 
        trackingEnabled={trackingEnabled} 
        toggleTracking={toggleTracking} 
      />
      <DrawingModeControl 
        drawingMode={drawingMode}
        setDrawingMode={setDrawingMode}
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
        <ForbiddenZonesInitializer />
        
        {drawingMode === 'path' ? (
          <MapClick />
        ) : (
          <ForbiddenZoneDrawing />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;