import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapClick } from '@/mapScripts/pathDrawing';
import LocationTracker from '@/mapScripts/locationTracker';
import GPSToggleControl from '@/mapScripts/gpsToggleControl';
import DrawingModeControl from '@/mapScripts/drawingModeControl';
import LaunchButton from '@/mapScripts/launchButton';
import UndoButton from '@/mapScripts/undoButton';
import { ForbiddenZoneDrawing, ForbiddenZonesInitializer } from '@/mapScripts/forbiddenZoneDrawing';

// Main Map Component
const Map = () => {
  const [trackingEnabled, setTrackingEnabled] = useState(true);
  const [drawingMode, setDrawingMode] = useState('path');
  const position = [59.3293, 18.0686]; // Stockholm coordinates

  const toggleTracking = () => {
    setTrackingEnabled(prev => !prev);
  };

  return (
    <div style={{ position: 'relative', height: '82vh', width: '100%' }}>
      
      <MapContainer 
        center={position} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

      <GPSToggleControl 
        trackingEnabled={trackingEnabled} 
        toggleTracking={toggleTracking} 
      />
      <DrawingModeControl 
        drawingMode={drawingMode}
        setDrawingMode={setDrawingMode}
      />
      <LaunchButton/>

        {/*This is the overlay HAMBURGER button */}
      <LayersControl position="topright">
      <LayersControl.Overlay name="Display Current Location">
      <Marker position={position}>
          <Popup>
            Current Location <br />
          </Popup>
        </Marker>
      </LayersControl.Overlay>
        <LayersControl.Overlay name="Display Current Restricted Areas">
        {/*Generate places with restricted flight zones */}
        <Circle position={position} radius={200}/>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Show Active Drones">
        {/*Generate locations of active drones*/}
        <Circle position={position} radius={200}/>
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

export default Map;