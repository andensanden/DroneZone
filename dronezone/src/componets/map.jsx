import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, LayersControl, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MapClick from '@/mapScripts/pathDrawing';
import { LocationTracker, GPSToggleControl } from '@/mapScripts/gps';
import ForbiddenZoneDrawing from '@/mapScripts/ForbiddenZoneDrawing';

import ForbiddenZonesManager from '@/mapScripts/forbiddenZone';

// Drawing Mode Control
const DrawingModeControl = ({ drawingMode, setDrawingMode }) => {
  return (
    <div className="drawing-mode-control" style={{
      position: 'absolute',
      top: '400px',
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

        {/*This is the overlay HAMBURGER button */}
      <LayersControl position="topright">
      <LayersControl.Overlay name="Display Current Location">
      </LayersControl.Overlay>
        <LayersControl.Overlay name="Display Current Restricted Areas">
        {/*Generate places with restricted flight zones */}
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Show Active Drones">
        {/*Generate locations of active drones*/}
        </LayersControl.Overlay>
      </LayersControl>
        
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

{/*This is the overlay HAMBURGER button */}
/*<LayersControl position="topright">
<LayersControl.Overlay name="Display Current Location">
  <Marker position={position}>
    <Popup>
      Current Location <br />
    </Popup>
  </Marker>
</LayersControl.Overlay>
  <LayersControl.Overlay name="Display Current Restricted Areas">
  {/*Generate places with restricted flight zones *///}
  /*<Circle position={position} radius={200}/>
  </LayersControl.Overlay>
  <LayersControl.Overlay name="Show Active Drones">
  {/*Generate locations of active drones*///}
  /*<Circle position={position} radius={200}/>
  </LayersControl.Overlay>
</LayersControl>*/

export default Map;