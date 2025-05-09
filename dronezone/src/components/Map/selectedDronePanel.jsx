import React from 'react';

export function SelectedDronePanel({ drone, onClose }) {
  if (!drone) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "80px",
        right: "20px",
        zIndex: 1000,
        width: "220px",
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#2137F8",
          color: "white",
          padding: "12px 16px",
          fontWeight: "bold",
          fontSize: "16px",
          borderBottom: "4px solid #1c398e",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Selected Device</span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
            padding: 0,
          }}
        >
          ✕
        </button>
      </div>
      <div style={{ padding: "12px 16px" }}>
        <DashboardRow label="ID" value={drone.id} />
        <DashboardRow label="Longitude" value={Number(drone.lng).toFixed(4)} />
        <DashboardRow label="Latitude" value={Number(drone.lat).toFixed(4)} />
        <DashboardRow label="Altitude" value={`${drone.altitude} m`} />
      </div>
    </div>
  );
}

const DashboardRow = ({ label, value, bold }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "5px 0",
      fontWeight: bold ? "bold" : "normal",
      borderBottom: "1px solid #eee",
      fontSize: "14px",
    }}
  >
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

  