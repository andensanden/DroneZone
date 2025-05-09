import { useState, useEffect } from 'react';
import icon from '@/assets/icon.svg'; 
import { useNavigate } from "react-router";
import { supabase } from "@/supabase/config";


export function YourDevicesMenu({ deviceStates, setDeviceStates, menuOpen, setMenuOpen,bottom, onToggleMenu }) {
  const navigate = useNavigate();

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [deviceName, setDeviceName] = useState([]);

  useEffect(() => { 

      const fetchData = async() => {

        const { data, error } = await supabase.auth.getUser();

        const deviceRespone = await fetch(`${backendURL}/api/device/${data.user.id}`); 

        const parsedDeviceData = await deviceRespone.json()
        setDeviceName(parsedDeviceData)
        
        
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
        <img src={icon} alt="Drone icon" className="w-[22px] h-[22px]" />
      </button>

      {menuOpen && (
        <div className="absolute top-[60px] left-0 bg-white rounded-2xl shadow-sm w-[220px] overflow-hidden" >
          <div className="px-[14px] py-[14px]">
          {deviceName.map((deviceName, index)=> {
            return(
                <div
                  key={deviceName.deviceTableID}
                  className="flex justify-between items-center font-bold text-sm" >
                  <input
                    disabled
                    value = {deviceName.deviceName}
                    className="py-1"
                  >
                  </input>
                  <input
                    type="checkbox"
                    onChange={() => {
                      const updated = [...deviceStates];
                      updated[index].checked = !updated[index].checked;
                      setDeviceStates(updated);
                    }}
                    className="w-[16px] h-[16px] accent-primary-yellow" />
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
