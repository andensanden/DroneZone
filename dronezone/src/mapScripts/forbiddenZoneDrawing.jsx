/* forbiddenZoneDrawing.jsx

  Handles the drawing of all forbidden zones on the map.

  coords are used to track the coordinates of the forbidden zone currently being drawn.
  currZone tracks the index of the zone currently being drawn.
  zones contains all zones existing on the map.

  Authors: Rasmus, Wasim
*/

import { useEffect, useState, useRef } from 'react';
import { useMap, Polygon } from 'react-leaflet';
import { ForbiddenZone } from './forbiddenZone.js';
import { useZones } from './ZonesContext.jsx';
import L from 'leaflet';

function ForbiddenZoneDrawing({ drawingMode }) {
  const map = useMap();
  const [coords, setCoords] = useState([]);
  const coordsRef = useRef([]);
  const { zones, updateZone, addZone } = useZones();
  const [currZone, setCurrZone] = useState(0);
  const currZoneRef = useRef(0);

  useEffect(() => {
    const handleClick = (e) => {
      if (drawingMode !== 'forbidden') return;
      // Return if either not in forbidden mode or if the click is on a UI element (such as a button)
      if (!e.originalEvent.target.classList.contains("leaflet-container")
        && !e.originalEvent.target.classList.contains("map-clickable")) return;

      setCoords((prevPoints) => {
        const newPoints = [...prevPoints, e.latlng];
        coordsRef.current = newPoints;
        return newPoints;
      });
    };

    map.on('click', handleClick);

    return () => {
      map.off('click', handleClick);
    };
  }, [map, drawingMode]);

  useEffect(() => {
    if (coordsRef.current.length === 0) return;
    // Update the context with the new zone after coords is updated
    const newZone = new ForbiddenZone([...coordsRef.current]);
    updateZone(currZoneRef.current, newZone);
  }, [coords]);

  // Stop drawing red zones when double click
  useEffect(() => {
    const handleDoubleClick = () => {
      if (coordsRef.current.length >= 1) {
        // Finalize current zone and move to next
        setCurrZone((prev) => prev + 1);
        setCoords([]);
        coordsRef.current = [];
      }
    };
  
    map.doubleClickZoom.disable();
    map.on('dblclick', handleDoubleClick);
  
    return () => {
      map.off('dblclick', handleDoubleClick);
      map.doubleClickZoom.enable();
    };
  }, [map]);

  // Update currZoneRef whenever currZone updates
  useEffect(() => {
    currZoneRef.current = currZone;
  }, [currZone]);

  // Run once on initial mounting of component
  // Use this to create all forbidden zones
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8080/api/zone/restricted", 
                      {method: "GET", headers: { "Content-Type": "application/json"}});
      const data = await response.json();
      /*for (var i = 0; i < 5; i++) {
        console.log("Updating zone:", currZoneRef.current);
        const coordinates = coordinatesToLatLngObject(data[i].coorArray);
        const newZone = new ForbiddenZone(coordinates);
        updateZone(currZoneRef.current, newZone);
        setCurrZone((prev) => prev + 1);
      }*/
     data.forEach((zoneData, index) => {
      if (!zoneData.coorArray || zoneData.coorArray.length === 0) return;
      console.log("Updating zone:", index);
      //console.log("Array: ", zoneData.coorArray);
      const coordinates = coordinatesToLatLngObject(zoneData.coorArray);
      console.log(coordinates);
      const newZone = new ForbiddenZone(coordinates);
      updateZone(index, newZone);
      //setCurrZone((prev) => prev + 1);
     })
      /*const coordinates = coordinatesToLatLngObject(data[1].coorArray);
      const newZone = new ForbiddenZone(coordinates);
      updateZone(currZoneRef.current, newZone);
      setCurrZone((prev) => prev + 1);*/
    }
    fetchData();
  }, []);

  function coordinatesToLatLngObject(coordArray) {
    if (coordArray[0].long)
      return coordArray.map(coord => L.latLng(coord.lat, coord.long));
    else
      return coordArray.map(coord => L.latLng(coord.lat, coord.lng));
  }

  return (
    <>
    {zones.map((zone, index) => 
      (zone && zone.coords.length > 0 && (
      <Polygon className="map-clickable" key={index} positions={zone.coords} color="red" fillOpacity={0.5} weight={1} />)
    ))}
  </>
  )
}

export default ForbiddenZoneDrawing;