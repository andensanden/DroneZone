import { useState, useEffect } from 'react';
import icon from '@/assets/icon.svg'; 
import { useNavigate } from "react-router";
import { supabase } from "@/supabase/config";
import { useSelector, useDispatch } from 'react-redux';
import { setAllDrones, setCurrentDeviceID } from '@/Redux/gpsPos/gpsPosSlice';


export function YourDevicesMenu({ menuOpen, setMenuOpen,bottom, onToggleMenu }) {
  const navigate = useNavigate();

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const dispatch = useDispatch();
  const { allDrones, currentDeviceID } = useSelector((state) => state.gpsPos);

  useEffect(() => { 

      const fetchData = async() => {

        const { data, error } = await supabase.auth.getUser();

        const deviceRespone = await fetch(`${backendURL}/api/device/${data.user.id}`); 

        const parsedDeviceData = await deviceRespone.json()
        console.log(parsedDeviceData);
        dispatch(setAllDrones(parsedDeviceData));
        
        
      }
      fetchData();
      }, []);


  return (
    <div
      style={{
        position: 'absolute',
        bottom: `${bottom}px`, 
        left: '12px',
        zIndex: 1000,
        transition: 'bottom 0.5s ease'
        
      }}
    >
      <button
        onClick={onToggleMenu} 
        className="bg-primary-yellow py-[10px] px-[16px] rounded-xl cursor-default font-bold text-sm flex items-center gap-[55px] hover:scale-107 transition-all duration-200 shadow-sm"
      >
        <span className="hidden md:block">Your Devices</span>
        <img src={icon} alt="Drone icon" style={{ width: '22px', height: '22px' }} />
      </button>

      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: '0',
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
            width: '220px',
            overflow: 'hidden'
          }}
        >
          <div style={{ padding: '10px 16px' }}>
          {allDrones.map((deviceName, index)=> {
            return(
                <div
                  key={deviceName.deviceID}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    
                    fontWeight: 'bold',
                    fontSize: '14px',
                    
                  }}
                >
                  <input
                    disabled
                    value = {deviceName.deviceName}
                    className="py-1"
                  >
                  </input>
                  <input
                    type="checkbox"
                    checked={currentDeviceID === deviceName.deviceID}
                    onChange={() => {
                      if (currentDeviceID === deviceName.deviceID) {
                        dispatch(setCurrentDeviceID(null));
                      } else {
                        dispatch(setCurrentDeviceID(deviceName.deviceID));
                      }
                    }}
                    style={{
                      width: '16px',
                      height: '16px',
                      accentColor: '#FFD700'
                    }}
                  />
                </div>  
                )}
                )}

            <div className="font-bold text-sm" >
              <button className='text-primary-yellow hover:scale-107 transition-all duration-200 px-1 py-1.5'
               onClick={() => navigate("/account")}>
              + Add New Device 
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
