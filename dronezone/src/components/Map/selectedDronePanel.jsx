import React from 'react';

export function SelectedDronePanel({ drone, onClose }) {
  if (!drone) return null;

  return (
    <div
      className="absolute top-[80px] right-[20px] z-1000 w-[180px] md:w-[220px] bg-white rounded-2xl shadow-sm overflow-hidden"
    >
      <div
        className="flex items-center bg-primary-blue font-bold text-sm sm:text-base text-white py-[8px] px-[16px]  
                   justify-between border-b-[4px] border-b-solid border-blue-900"
      >
        <span>Selected Device</span>
        <button
          onClick={onClose}
          className="text-white font-bold text-2xl cursor-pointer"
        >
          ✕
        </button>
      </div>
      <div className="py-[5px] px-[16px]">
        <DashboardRow label="ID" value={drone.id} />
        <DashboardRow label="Longitude" value={Number(drone.lng).toFixed(4)} />
        <DashboardRow label="Latitude" value={Number(drone.lat).toFixed(4)} />
        <DashboardRow label="Altitude" value={`${drone.altitude} m`} />
      </div>
    </div>
  );
}

const DashboardRow = ({ label, value }) => (
  <div className="flex py-[5px] text-sm border-b border-neutral-300 justify-between"
  >
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

  