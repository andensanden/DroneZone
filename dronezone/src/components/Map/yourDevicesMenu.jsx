import { useState } from 'react';
import icon from '@/assets/icon.svg'; // Update this path as needed
/*
ADD this to real "loggedinmap"
import { YourDevicesMenu } from './yourDevicesMenu';
//For your devices 
const [devicesMenuOpen, setDevicesMenuOpen] = useState(false);
  const [deviceStates, setDeviceStates] = useState([
    { name: 'DJI AIR 3S – Photography...', checked: false },
    { name: 'Tinyhawk III Plus – Racing', checked: true }
  ]);
//--------------Call function-----
{/* your devices Menu*
<YourDevicesMenu
deviceStates={deviceStates}
setDeviceStates={setDeviceStates}
menuOpen={devicesMenuOpen}
setMenuOpen={setDevicesMenuOpen}
/>

 */


export function YourDevicesMenu({ deviceStates, setDeviceStates, menuOpen, setMenuOpen,bottom }) {
  return (
    <div
      style={{
        position: 'absolute',
  bottom: `${bottom}px`, // ← passed as a prop from the parent
  left: '20px',
  zIndex: 1000,
  transition: 'bottom 0.5s ease'
        
      }}
    >
      <button
        onClick={() => setMenuOpen(!menuOpen)}
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

      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: '0',
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
            width: '260px',
            overflow: 'hidden'
          }}
        >
          <div style={{ padding: '10px 16px' }}>
            {deviceStates.map((device, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom:
                    index !== deviceStates.length - 1 ? '1px solid #ddd' : 'none',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                <span
                  style={{
                    maxWidth: '160px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {device.name}
                </span>
                <input
                  type="checkbox"
                  checked={device.checked}
                  onChange={() => {
                    const updated = [...deviceStates];
                    updated[index].checked = !updated[index].checked;
                    setDeviceStates(updated);
                  }}
                  style={{
                    width: '16px',
                    height: '16px',
                    accentColor: '#FFD700'
                  }}
                />
              </div>
            ))}

            <div
              style={{
                paddingTop: '10px',
                color: '#FBBF24',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              + Add New Device
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
