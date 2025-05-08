import React from 'react';
import { useSelector } from 'react-redux';

const DashboardPanel = ({ data }) => {

  const { position } = useSelector((state) => state.gpsPos);

  return (
    <div className="hidden sm:block bg-white rounded-2xl w-[170px] md:w-[250px]">
      <div className="bg-primary-blue text-white rounded-t-2xl pt-[12px] pb-[12px] pl-[16px] pr-[16px] font-bold text-base border-b-[4px] border-b-solid border-blue-900">
        Dashboard
      </div>
      <div style={{ padding: '12px 16px' }}>
        <DashboardRow label="Longitude" value={Number(position[0]).toFixed(4)} />
        <DashboardRow label="Latitude" value={Number(position[1]).toFixed(4)} />
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
