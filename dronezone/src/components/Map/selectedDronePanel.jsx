export function SelectedDronePanel({ drone, onClose }) {
    if (!drone) return null;
  
    return (
      <div
        style={{
          position: "absolute",
          top: "80px",
          right: "20px",
          zIndex: 1000,
          width: "180px",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ background: "#2137F8", color: "white", padding: "12px 16px", fontWeight: "bold", fontSize: "16px", borderBottom: "4px solid #1c398e" }}>
          Selected Device
          <button
            onClick={onClose}
            style={{ float: "right", background: "none", border: "none", color: "white", fontWeight: "bold", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>
        <div style={{ padding: "12px 16px", fontSize: "14px" }}>
          <div><strong>ID</strong> &nbsp; | &nbsp; {drone.id}</div>
          <div><strong>Longitude</strong> &nbsp; | &nbsp; {drone.lng}</div>
          <div><strong>Latitude</strong> &nbsp; | &nbsp; {drone.lat}</div>
          <div><strong>Altitude:</strong> &nbsp; | &nbsp;{drone.altitude} m</div>
        </div>
      </div>
    );
  }
  