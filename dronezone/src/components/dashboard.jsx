import React from 'react';


const DashboardPanel = ({ data }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      width: '260px',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        backgroundColor: '#2563eb',
        color: 'white',
        padding: '12px 16px',
        fontWeight: 'bold',
        fontSize: '16px',
        borderBottom: '4px solid #1e40af',
      }}>
        Dashboard
      </div>
      <div style={{ padding: '12px 16px' }}>
        <DashboardRow label="Longitude" value={data.longitude} />
        <DashboardRow label="Latitude" value={data.latitude} />
        <DashboardRow label="Altitude" value={data.altitude} />
        <DashboardRow label="Time Elapsed" value={data.timeElapsed || ''} bold />
      </div>
    </div>
  );
};

const DashboardRow = ({ label, value, bold }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    fontWeight: bold ? 'bold' : 'normal',
    borderBottom: '1px solid #eee',
    fontSize: '14px'
  }}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default DashboardPanel;
