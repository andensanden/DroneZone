/* forbiddenZoneDrawing.jsx

  Handles the drawing of all forbidden zones on the map.

  coords are used to track the coordinates of the forbidden zone currently being drawn.
  currZone tracks the index of the zone currently being drawn.
  zones contains all zones existing on the map.
*/



import { useEffect, useState, useRef } from 'react';
import { useMap, Polygon } from 'react-leaflet';
import { ForbiddenZone } from './forbiddenZone.js';
import { useZones } from './ZonesContext.jsx';
import L from 'leaflet';



/**
 * Component for drawing red forbidden zones on a Leaflet map.
 *
 * @param {{ drawingMode: string }} props - Props object
 * @param {string} props.drawingMode - Current drawing mode (e.g. "forbidden", "node", etc.)
 * @returns {JSX.Element} Polygon elements representing forbidden zones
 */
function ForbiddenZoneDrawing({ drawingMode }) {
  const map = useMap();
  const [coords, setCoords] = useState([]);
  const coordsRef = useRef([]);
  const { zones, updateZone, showRestrictedZones } = useZones();
  const [currZone, setCurrZone] = useState(0);
  const currZoneRef = useRef(0);

  useEffect(() => {
    const handleClick = (e) => {
      // Return if either not in forbidden mode or if the click is on a UI element (such as a button)
      if (drawingMode !== 'forbidden') return;
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

  // Update the context with the new zone after coords is updated
  // Remove when removing manual drawing of forbidden zones
  useEffect(() => {
    if (coordsRef.current.length === 0) return;
    const newZone = new ForbiddenZone([...coordsRef.current]);
    updateZone(currZoneRef.current, newZone);
  }, [coords]);

  // Stop drawing red zones when double click
  // Remove when removing manual red zone drawing
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

      data.forEach((zoneData, index) => {
      const coordinates = coordinatesToLatLngObject(zoneData.coorArray);
      const newZone = new ForbiddenZone(coordinates);
      updateZone(index, newZone);
      setCurrZone(index+1); // Temporary, remove when manual drawing of forbidden zones is removed
     })
    }
    fetchData();
  }, []);


  /**
   * Converts an array of plain coordinate objects to a LatLng objects.
   * @param {{lat: number, long: number}[]} coordArray Array of coordinates with `lat` and `long` keys
   * @returns {L.LatLng[]} Array of LatLng objects
   */
  function coordinatesToLatLngObject(coordArray) {
    return coordArray.map(coord => L.latLng(coord.lat, coord.long));
  }

  return (
    <>
    {showRestrictedZones && zones.map((zone, index) => 
      (zone && zone.coords.length > 0 && (
      <Polygon className="map-clickable" key={index} positions={zone.coords} color="red" fillOpacity={0.5} weight={1} />)
    ))}
  </>
  )
}

export default ForbiddenZoneDrawing;