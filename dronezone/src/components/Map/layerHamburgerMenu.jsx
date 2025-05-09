import { useState, useEffect, useRef } from 'react';
import { useZones } from '@/mapScripts/zonesContext'
import { IoMenu } from "react-icons/io5";

export function HamburgerButton({ trackingEnabled, setTrackingEnabled,showActiveDrones,
  setShowActiveDrones }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { showRestrictedZones, toggleZones } = useZones();
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearLayers = () => {
    setShowActiveDrones(false);
    if (showRestrictedZones) toggleZones();
    setTrackingEnabled(false);
  };

  
  return (
    <div 
    ref={menuRef}
    className="absolute top-[20px] right-[20px] z-1000">
      
      <button
        onClick={() => setMenuOpen(!menuOpen)}
       className="flex justify-center bg-white rounded-xl p-[5px] shadow-sm  h-[40px] w-[50px] hover:scale-107 transition-all duration-200"
      >
        <IoMenu size={32} className="text-primary-yellow" />
      </button>

      {menuOpen && (
        <div className="absolute top-[60px] right-0 bg-white cursor-default rounded-2xl shadow-sm overflow-hidden p-[16px] w-[200px] ">
          <div className="font-bold text-base pb-[7px] ">
            Layers
          </div>

          <div className="h-[2px] bg-white w-full" />

          {[
            { label: 'Active Drones', checked: showActiveDrones, toggle: () => setShowActiveDrones(!showActiveDrones) },
            { label: 'Restricted Zones', checked: showRestrictedZones, toggle: () => toggleZones() },
            { label: 'Current Location', checked: trackingEnabled, toggle: () => setTrackingEnabled(!trackingEnabled) }
          ].map((layer, i) => (
            <label key={i} className="flex justify-between items-center py-[3px] text-xs font-semibold" >
              {layer.label}
              <input
                type="checkbox"
                checked={layer.checked}
                onChange={layer.toggle}
                className="w-[18px] h-[18px] cursor-pointer accent-primary-yellow"
              />
            </label>
          ))}

          <button
            onClick={clearLayers}
            className="font-bold text-sm pt-[12px] text-red-600 cursor-pointer"
            >
            Clear Layers
          </button>
        </div>
      )}
    </div>
  );
}
