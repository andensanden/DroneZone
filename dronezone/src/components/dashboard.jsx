import React from 'react';
import { useSelector } from 'react-redux';
import useFlightTimer from './Map/dashboardTimer';

const DashboardPanel = ({ data,launchActive,resetKey }) => {

  const { position } = useSelector((state) => state.gpsPos);
  const { formatted: formattedTime } = useFlightTimer(launchActive, resetKey);

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
        <DashboardRow label="Longitude" value={Number(position[0]).toFixed(4)} />
        <DashboardRow label="Latitude" value={Number(position[1]).toFixed(4)} />
        <DashboardRow label="Altitude" value={data.altitude} />
        <DashboardRow label="Time Elapsed" value={formattedTime} bold />
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
