import { useState, useEffect, useRef } from 'react';
import { useZones } from '@/mapScripts/ZonesContext'

export function HamburgerButton({ trackingEnabled, setTrackingEnabled,showActiveDrones,
  setShowActiveDrones }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { showRestrictedZones, toggleZones } = useZones();
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearLayers = () => {
    setShowActiveDrones(false);
    if (showRestrictedZones) toggleZones();
    setTrackingEnabled(false);
  };

  


  return (
    <div 
    ref={menuRef}
    style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000 }}>
      
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
        {[...Array(3)].map((_, i) => (
          <span
            key={i}
            style={{ height: '3px', backgroundColor: '#FFD700', borderRadius: '20px' }}
          />
        ))}
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
            padding: '16px 0',
          }}>
            Layers
          </div>

          <div style={{
            height: '2px',
            backgroundColor: '#e5e7eb',
            width: '100%',
            margin: 0,
            padding: 0
          }} />

          {[
            { label: 'Active Drones', checked: showActiveDrones, toggle: () => setShowActiveDrones(!showActiveDrones) },
            { label: 'Restricted Zones', checked: showRestrictedZones, toggle: () => toggleZones() },
            { label: 'Current Location', checked: trackingEnabled, toggle: () => setTrackingEnabled(!trackingEnabled) }
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
  );
}
