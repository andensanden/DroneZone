import { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Polyline
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MapClick from '@/mapScripts/pathDrawing';
import { LocationTracker, GPSToggleControl } from '@/mapScripts/gps';
import {
  ForbiddenZoneDrawing,
  DrawingModeControl,
  ForbiddenZonesInitializer
} from '@/mapScripts/forbiddenZoneDrawing';
import { toast } from 'react-toastify';
import icon from '@/assets/icon.svg';
import FlightPathDrawer from '@/mapScripts/FlightPathDrawer';
import { useEffect } from 'react';

import {GiPathDistance} from "react-icons/gi";

const LoggedInMap = () => {
  const [position, setPosition] = useState([59.3293, 18.0686]);
  const [trackingEnabled, setTrackingEnabled] = useState(true);
  const [drawingMode, setDrawingMode] = useState('path');
  const [showCurrentLocation, setShowCurrentLocation] = useState(true);
  const [showRestrictedZones, setShowRestrictedZones] = useState(true);
  const [showActiveDrones, setShowActiveDrones] = useState(true);
  const [showFlightPath, setShowFlightPath] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [devicesMenuOpen, setDevicesMenuOpen] = useState(false);
  const [flightPathMenuOpen, setFlightPathMenuOpen] = useState(false);
  const [confirmFlightPath, setConfirmFlightPath] = useState(false);
  const [flightPath, setFlightPath] = useState([]); // array of LatLngs

  const accountInfo = {
    devices: ["DJI AIR 3S – Photography...", "Emax Tinyhawk III Plus – Racing"]
  };

  const [deviceStates, setDeviceStates] = useState(
    accountInfo.devices.map(name => ({ name, checked: false }))
  );

  const toggleTracking = () => setTrackingEnabled(prev => !prev);
  const clearLayers = () => {
    setShowCurrentLocation(false);
    setShowRestrictedZones(false);
    setShowActiveDrones(false);
    setShowFlightPath(false);
  };

  const baseBottom = 80; // reserve bottom space for Launch button
  const drawFlightButtonHeight = 60;
  const drawFlightPanelHeight = 320;
  const devicesButtonHeight = 60;
  const devicesPanelHeight = 260;

  const drawFlightBottom = baseBottom;
  const devicesBottom = drawFlightBottom + (flightPathMenuOpen ? drawFlightPanelHeight : drawFlightButtonHeight) + 10;

  return (
    <div style={{ position: 'relative', height: '82vh', width: '100%' }}>
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <GPSToggleControl trackingEnabled={trackingEnabled} toggleTracking={() => setTrackingEnabled(prev => !prev)} />
        

        {showCurrentLocation && <Marker position={position}><Popup>Current Location</Popup></Marker>}
        {showRestrictedZones && <Circle center={position} radius={200} color="red"><Popup>Restricted Area</Popup></Circle>}
        {showActiveDrones && <Circle center={[position[0] + 0.002, position[1] + 0.002]} radius={150} color="blue"><Popup>Active Drone</Popup></Circle>}
        {showFlightPath && (
          <Polyline
            positions={[
              position,
              [position[0] + 0.002, position[1] + 0.001],
              [position[0] + 0.003, position[1] + 0.0005]
            ]}
            color="purple"
          />
        )}

        <LocationTracker
          trackingEnabled={trackingEnabled}
          onLocationUpdate={({ latitude, longitude }) => {
            setPosition([latitude, longitude]);
          }}
        />

        <ForbiddenZonesInitializer />
        {!confirmFlightPath && drawingMode === 'path' && <MapClick />}
      </MapContainer>

      {/* 🚀 Launch Button */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000
      }}>
        <button style={{
          backgroundColor: '#1D4ED8',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '30px',
          padding: '10px 55px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          border: 'none',
          cursor: 'pointer'
        }}>
          Launch
        </button>
      </div>

      {/* 🗺️ Layers Hamburger Menu */}
      <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000 }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'white',
            padding: '10px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '40px',
            width: '50px'
          }}
        >
          <span style={{ height: '3px', backgroundColor: '#FFD700', borderRadius: '20px' }} />
          <span style={{ height: '3px', backgroundColor: '#FFD700', borderRadius: '20px' }} />
          <span style={{ height: '3px', backgroundColor: '#FFD700', borderRadius: '20px' }} />
        </button>

        {menuOpen && (
          <div style={{
            position: 'absolute',
            top: '60px',
            right: '0',
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
            width: '260px',
            padding: '16px'
          }}>
            <h4 style={{ marginBottom: '10px', fontWeight: 'bold' }}>Layers</h4>
            {[
              { label: 'Active Drones', checked: showActiveDrones, toggle: () => setShowActiveDrones(!showActiveDrones) },
              { label: 'Restricted Zones', checked: showRestrictedZones, toggle: () => setShowRestrictedZones(!showRestrictedZones) },
              { label: 'Current Location', checked: trackingEnabled, toggle: () => setTrackingEnabled(prev => !prev) }
            ].map((layer, i) => (
              <label key={i} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '10px 0',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {layer.label}
                <input
                  type="checkbox"
                  checked={layer.checked}
                  onChange={layer.toggle}
                  style={{ width: '18px', height: '18px', accentColor: '#FFD700', cursor: 'pointer' }}
                />
              </label>
            ))}

            <button
              onClick={clearLayers}
              style={{
                marginTop: '12px',
                background: 'transparent',
                border: 'none',
                color: 'red',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Clear Layers
            </button>
          </div>
        )}
      </div>

      {/* ✏️ Draw Flight Path menu */}
      <div style={{
        position: 'absolute',
        bottom: flightPathMenuOpen ? '310px' : '100px',
        left: '20px',
        zIndex: 1000,
        transition: 'bottom 0.5s ease'
      }}>
        <button
          onClick={() => {
            setFlightPathMenuOpen(!flightPathMenuOpen);
            setDevicesMenuOpen(false);
            setDrawingMode('path'); // Activate path drawing
          }}
          style={{
            background: '#FFD700',
            padding: '10px 16px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '30px'
          }}
        >
          <span>Draw Flight Path</span>
          <GiPathDistance size={24} />
        </button>

        {flightPathMenuOpen && (
          <div style={{
            position:'absolute',
            top: '60px',
            left:'0',
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
            width: '260px',
            overflow: 'hidden',
            fontFamily: 'Arial, sans-serif'
          }}>
            

            <div style={{ padding: '12px 16px' }}>
              <div style={{
                padding: '10px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #ddd',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                <span>Confirm Flight Path</span>
                <input
                  type="checkbox"
                  checked={confirmFlightPath}
                  onChange={() => {
                    const confirmed = !confirmFlightPath;
                    setConfirmFlightPath(confirmed);
                    if (confirmed) setDrawingMode(null); // disable drawing
                  }}

                  style={{ width: '16px', height: '16px', accentColor: '#FFD700' }}
                />
              </div>

              <div style={{ color: 'green', fontWeight: 'bold', fontSize: '14px', margin: '12px 0', cursor: 'pointer' }}>
                Place End-Point
              </div>

              <div style={{ color: 'red', fontWeight: 'bold', fontSize: '14px', margin: '12px 0', cursor: 'pointer' }}>
                Undo
              </div>

              <div style={{ color: 'red', fontWeight: 'bold', fontSize: '14px', margin: '12px 0', cursor: 'pointer' }}>
                Clear Selection
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Your Devices drop-down */}
      <div style={{
        position: 'absolute',
        bottom: devicesMenuOpen ? '230px' : '20px',
        left: '20px',
        zIndex: 1000,
        transition: 'bottom 0.5s ease'
      }}>
        <button
          onClick={() => {setDevicesMenuOpen(!devicesMenuOpen); setFlightPathMenuOpen(false);}}
          
          style={{
            background: '#FFD700',
            padding: '10px 16px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '55px'
          }}
        >
          <span>Your Devices</span>
          <img src={icon} alt="Drone icon" style={{ width: '22px', height: '22px' }} />
        </button>

        {devicesMenuOpen && (
          <div style={{
            position:'absolute',
            top: '60px',
            left:'0',
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
            width: '260px',
            overflow: 'hidden'
          }}>
           

            <div style={{ padding: '10px 16px' }}>
              {deviceStates.map((device, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: index !== deviceStates.length - 1 ? '1px solid #ddd' : 'none',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>
                  <span style={{
                    maxWidth: '160px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>{device.name}</span>
                  <input
                    type="checkbox"
                    checked={device.checked}
                    onChange={() => {
                      const updated = [...deviceStates];
                      updated[index].checked = !updated[index].checked;
                      setDeviceStates(updated);
                    }}
                    style={{ width: '16px', height: '16px', accentColor: '#FFD700' }}
                  />
                </div>
              ))}

              <div style={{
                paddingTop: '10px',
                color: '#FBBF24',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                + Add New Device
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoggedInMap;
