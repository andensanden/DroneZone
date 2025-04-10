// src/mapScripts/forbiddenZoneDrawing.jsx
import { useEffect, useState, useRef } from 'react';
import { useMap, Polygon } from 'react-leaflet';
import { ForbiddenZone } from './forbiddenZone.js';

function ForbiddenZoneDrawing() {
  const map = useMap();
  const [clickPoints, setPoints] = useState([]);
  const clickPointsRef = useRef([]);
  const [zones, setZones] = useState([]);
  const [currZone, setCurrZone] = useState(0);
  const currZoneRef = useRef(0);

  // WIP (ask Rasmus before editing)
  // Remove clickPoints?? Also check the references if they are all necessary

  useEffect(() => {
    const handleClick = (e) => {
      // Return if either not in forbidden mode or if the click is on a UI element (such as a button)
      if (!e.originalEvent.target.classList.contains('leaflet-container')) return;

      setPoints((prevPoints) => {
        const newPoints = [...prevPoints, e.latlng];
        clickPointsRef.current = newPoints;

        const newZone = new ForbiddenZone([...prevPoints, e.latlng]);
        setZones((prevZones) => {
          const newZones = [...prevZones];
          newZones[currZoneRef.current] = newZone;
          return newZones;
        });
        return newZone.coords;
      });
    };

    map.on('click', handleClick);

    return () => {
      map.off('click', handleClick);
    };
  }, [map]);

  useEffect(() => {
    const handleDoubleClick = () => {
      if (clickPointsRef.current.length >= 1) {
        // Finalize current zone and move to next
        setCurrZone((prev) => prev + 1);
        setPoints([]);
        clickPointsRef.current = [];
      }
    };
  
    map.doubleClickZoom.disable();
    map.on('dblclick', handleDoubleClick);
  
    return () => {
      map.off('dblclick', handleDoubleClick);
      map.doubleClickZoom.enable();
    };
  }, [map]);

  useEffect(() => {
    currZoneRef.current = currZone;
  }, [currZone]);

  return (
    <>
    {zones.map((zone, index) => 
      (zone.coords.length > 0 && (
      <Polygon key={index} positions={zone.coords} color="red" fillOpacity={0.5} weight={1} />)
    ))}
  </>
  )
}

export default ForbiddenZoneDrawing;