// src/mapScripts/forbiddenZoneDrawing.jsx
import { useEffect, useState, useRef } from 'react';
import { useMap, Polygon } from 'react-leaflet';
import { ForbiddenZone } from './forbiddenZone.js';
import { useZones } from './ZonesContext.jsx'

function ForbiddenZoneDrawing({ drawingMode }) {
  const map = useMap();
  const [clickPoints, setPoints] = useState([]);
  const clickPointsRef = useRef([]);
  //const [zones, setZones] = useState([]);
  const { zones, addZone, updateZone } = useZones();
  const [currZone, setCurrZone] = useState(0);
  const currZoneRef = useRef(0);

  // WIP
  // Remove clickPoints?? Also check the references if they are all necessary

  useEffect(() => {
    const handleClick = (e) => {
      if (drawingMode === 'path') return;
      // Return if either not in forbidden mode or if the click is on a UI element (such as a button)
      if (!e.originalEvent.target.classList.contains('leaflet-container')) return;

      setPoints((prevPoints) => {
        const newPoints = [...prevPoints, e.latlng];
        clickPointsRef.current = newPoints;

        //const newZone = new ForbiddenZone([...prevPoints, e.latlng]);
        /*setZones((prevZones) => {
          const newZones = [...prevZones];
          newZones[currZoneRef.current] = newZone;
          return newZones;
        });*/
        //updateZone(currZoneRef.current, newZone);
        //return newZone.coords;
        return newPoints;
      });
    };

    map.on('click', handleClick);

    return () => {
      map.off('click', handleClick);
    };
  }, [map, drawingMode]);

  useEffect(() => {
    if (clickPointsRef.current.length === 0) return;
    // Update the context with the new zone after `currZone` is updated
    const newZone = new ForbiddenZone([...clickPointsRef.current]);
    updateZone(currZoneRef.current, newZone);
  }, [clickPoints, currZone]);  // Trigger whenever clickPoints or currZone changes

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