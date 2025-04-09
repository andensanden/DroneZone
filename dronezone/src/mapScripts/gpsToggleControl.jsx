import 'leaflet/dist/leaflet.css';

// GPS Toggle Control
function GPSToggleControl({ trackingEnabled, toggleTracking }) {
    return (
      <div className="leaflet-bar leaflet-control" style={{ position: 'absolute', top: '20%', left: '0.5%', zIndex: 1000, pointerEvents: 'auto', }}>
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
}

export default GPSToggleControl;