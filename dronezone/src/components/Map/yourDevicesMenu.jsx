import { useState, useEffect } from 'react';
import icon from '@/assets/icon.svg'; // Update this path as needed
import { useNavigate } from "react-router";
import { supabase } from "@/supabase/config";
import { Logo } from '../logo';


export function YourDevicesMenu({ deviceStates, setDeviceStates, menuOpen, setMenuOpen,bottom, onToggleMenu }) {
  const navigate = useNavigate();

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [deviceName, setDeviceName] = useState([]);

  useEffect(() => { 

      const fetchData = async() => {

        const { data, error } = await supabase.auth.getUser();

        const deviceRespone = await fetch(`${backendURL}/api/device/${data.user.id}`); //Fetching device data

        const parsedDeviceData = await deviceRespone.json()
        setDeviceName(parsedDeviceData)
        
        
      }
      fetchData();
      }, []);


  return (
    <div
      style={{
        position: 'absolute',
        bottom: `${bottom}px`, // ← passed as a prop from the parent
        left: '20px',
        zIndex: 1000,
        transition: 'bottom 0.5s ease'
        
      }}
    >
      <button
        onClick={onToggleMenu} 
        className="bg-primary-yellow pt-[10px] pb-[10px] pl-[16px] pr-[16px] rounded-xl cursor-default font-bold text-sm flex items-center gap-[55px] hover:scale-107 transition-all duration-200 shadow-sm"
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
          <div className="px-[12px] py-[16px]">
          {deviceName.map((deviceName, index)=> {
            return(
                <div
                  key={deviceName.deviceTableID}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom:
                      index !== deviceStates.length - 1 ? '1px solid #ddd' : 'none',
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
                    // checked={device.checked}
                    onChange={() => {
                      const updated = [...deviceStates];
                      updated[index].checked = !updated[index].checked;
                      setDeviceStates(updated);
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
