import React from 'react';
import { useSelector } from 'react-redux';


export function SmallDashboard() {

		const { position } = useSelector((state) => state.gpsPos);
			
		const DashboardRow = ({ label, value }) => (
			<div className="flex pt-[8px] pb-[8px] text-sm border-b border-neutral-300 justify-between">
				<span>{label}</span>
				<span>{value}</span>
			</div>
		)

		return (
			<div className="bg-white rounded-2xl w-[110px] cursor-default shadow-sm sm:hidden">
				<div className="bg-primary-blue text-white rounded-t-2xl px-[16px] py-[12px]
								font-bold text-sm border-b-[4px] border-b-solid border-blue-900">
					Dashboard
				</div>
					<div className="pt-[5px] pb-[10px] px-[16px] ">
						<DashboardRow label="Lng" value={Number(position[0]).toFixed(2)} />
						<DashboardRow label="Lat" value={Number(position[1]).toFixed(2)} />
					</div>
				</div>
		)
}

