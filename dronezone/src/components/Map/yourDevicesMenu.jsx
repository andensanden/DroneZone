import { useState, useEffect } from 'react';
import icon from '@/assets/icon.svg'; // Update this path as needed
import { useNavigate } from "react-router";
import { supabase } from "@/supabase/config";


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
        style={{
          background: '#FFD700',
          padding: '10px 16px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '55px'
        }}
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
            width: '260px',
            overflow: 'hidden'
          }}
        >
          <div style={{ padding: '10px 16px' }}>
          {deviceName.map((deviceName, index)=> {
            return(
                <div
                  key={deviceName.deviceTableID}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom:
                      index !== deviceStates.length - 1 ? '1px solid #ddd' : 'none',
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}
                >
                  <input
                    disabled
                    value = {deviceName.deviceName}
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

            <div
              style={{
                paddingTop: '10px',
                fontWeight: 'bold',
                fontSize: '14px',
                }}
              >
              <button className='text-primary-yellow hover:scale-107 transition-all duration-200'
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
