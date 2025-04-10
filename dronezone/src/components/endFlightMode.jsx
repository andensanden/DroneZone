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
import DashboardPanel from '@/components/dashboard'; // adjust path if needed
import { useEffect } from 'react';

const droneIcon = L.icon({
    iconUrl: icon,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });

const EndFlightMode = () => {
  const [position, setPosition] = useState([59.3293, 18.0686]);
  const [trackingEnabled, setTrackingEnabled] = useState(true);
  const [drawingMode, setDrawingMode] = useState('path');
  const [showCurrentLocation, setShowCurrentLocation] = useState(false);
  const [showRestrictedZones, setShowRestrictedZones] = useState(true);
  const [showActiveDrones, setShowActiveDrones] = useState(true);
  const [showFlightPath, setShowFlightPath] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [devicesMenuOpen, setDevicesMenuOpen] = useState(false);
  const [flightPathMenuOpen, setFlightPathMenuOpen] = useState(false);
  const [confirmFlightPath, setConfirmFlightPath] = useState(false);
  const [flightPath, setFlightPath] = useState([]); // array of LatLngs
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
const [timerId, setTimerId] = useState(null);
useEffect(() => {
    const id = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    setTimerId(id);
    return () => clearInterval(id);
  }, []);
  
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };


  const accountInfo = {
    devices: ["DJI AIR 3S – Photography...", "Emax Tinyhawk III Plus – Racing"]
  };

  const [deviceStates, setDeviceStates] = useState(
    accountInfo.devices.map(name => ({ name, checked: false }))
  );

    const dummyActiveDrones = [
      { name: 'Drone Alpha', position: [59.4041, 17.9449], icon: icon },
      { name: 'Drone Bravo', position: [59.3375, 18.0650], icon: icon },
    ];
  
    const dummyRestrictedZones = [
      { center: [59.6494, 17.9343], radius: 5000 },
      { center: [59.3054, 18.0236], radius: 150 },
    ];

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
        

        {showCurrentLocation && trackingEnabled && position && (
          <>
            <Marker position={position}>
              <Popup>Current Location</Popup>
            </Marker>
            <Circle center={position} radius={500} options={{ fillColor: 'red', fillOpacity: 0.3 }} />
          </>
        )}

        {showRestrictedZones && dummyRestrictedZones.map((zone, idx) => (
          <Circle
            key={`restricted-${idx}`}
            center={zone.center}
            radius={zone.radius}
            color="red"
            fillOpacity={0.3}
          >
            <Popup>Restricted Zone</Popup>
          </Circle>
        ))}

        {showActiveDrones && dummyActiveDrones.map((drone, idx) => (
          <Marker
            key={`drone-${idx}`}
            position={drone.position}
            icon={L.icon({
                iconUrl: drone.icon,
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                popupAnchor: [0, -16]
              })}
          >

            <Popup>{drone.name}</Popup>
          </Marker>
        ))}

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

      <div style={{
  position: 'absolute',
  bottom: '30px',
  right: '30px',
  zIndex: 1000
}}>
  <DashboardPanel
    data={{
      longitude: position[0],
      latitude: position[1],
      altitude: 'N/A',
      timeElapsed: formatTime(elapsedSeconds)
    }}
  />
</div>
      {/* 🚀 End Button */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000
      }}>
        <button 
            onClick={() => {
            
                if (timerId) {
                  clearInterval(timerId);
                }
    
                 setElapsedSeconds(0); // if you want to reset timer
                navigate('/loggedInMap'); // if using React Router
              }}
        style={{
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
          End Flight
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
            overflow: 'hidden',
            padding: '16px'
          }}>
            <div style={{
      fontWeight: 'bold',
      fontSize: '16px',
      padding: '16px',
    }}>
      Layers
    </div>

    {/* Divider line */}
    <div style={{
      height: '2px',
      backgroundColor: '#e5e7eb',
      width: '100%',
  margin: 0,
  padding: 0
    }} />
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
export default EndFlightMode;
