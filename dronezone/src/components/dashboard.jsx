import React from 'react';
import { useSelector } from 'react-redux';
import useFlightTimer from './Map/dashboardTimer';

const DashboardPanel = ({ data,launchActive,resetKey }) => {

  const { position } = useSelector((state) => state.gpsPos);
  const { formatted: formattedTime } = useFlightTimer(launchActive, resetKey);

  return (
    <div className="hidden sm:block bg-white rounded-2xl shadow-sm cursor-default w-[170px] md:w-[220px]">
      <div className="bg-primary-blue text-white rounded-t-2xl py-[12px] px-[16px] font-bold text-base border-b-[4px] border-b-solid border-blue-900">
        Dashboard
      </div>
      <div className="pt-[7px] pb-[12px] px-[16px]">
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
