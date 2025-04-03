import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MapClick from '@/mapScripts/pathDrawing';
import { LocationTracker, GPSToggleControl } from '@/mapScripts/gps';

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