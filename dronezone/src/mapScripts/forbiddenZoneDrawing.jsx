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
import { useZones } from './ZonesContext.jsx'

  const coordinatesDecimal = [
    [59.71139, 17.92389], [59.71111, 17.93139],
  [59.71056, 17.93917], [59.70972, 17.94667],
  [59.70861, 17.95417], [59.70778, 17.95889],
  [59.70806, 17.96361], [59.70861, 17.97139],
  [59.70889, 17.97917], [59.70861, 17.9875],
  [59.70806, 17.99583], [59.70694, 18.00222],
  [59.70611, 18.00972], [59.70472, 18.01667],
  [59.70278, 18.02361], [59.70083, 18.03028],
  [59.69833, 18.03639], [59.69556, 18.04222],
  [59.69278, 18.04722], [59.68972, 18.05194],
  [59.68639, 18.05611], [59.68278, 18.05972],
  [59.67917, 18.06278], [59.67556, 18.06528],
  [59.67167, 18.06694], [59.66778, 18.06778],
  [59.66389, 18.06806], [59.66, 18.06778],
  [59.65611, 18.06694], [59.65222, 18.06528],
  [59.64861, 18.06278], [59.645, 18.05972],
  [59.64167, 18.05556], [59.62944, 18.04361],
  [59.61861, 18.03833], [59.61472, 18.03667],
  [59.61111, 18.03444], [59.6075, 18.03139],
  [59.60389, 18.0275], [59.60056, 18.02361],
  [59.5975, 18.01889], [59.59472, 18.01361],
  [59.5925, 18.00806], [59.58944, 18.00167],
  [59.5875, 17.99528], [59.58556, 17.98833],
  [59.58306, 17.98056], [59.5825, 17.97278],
  [59.58222, 17.96417], [59.58167, 17.95639],
  [59.58139, 17.94861], [59.58167, 17.94083],
  [59.58222, 17.93306], [59.58306, 17.925],
  [59.58417, 17.9175], [59.58556, 17.91],
  [59.5875, 17.90278], [59.58944, 17.89611],
  [59.59056, 17.88917], [59.59167, 17.8825],
  [59.59278, 17.875], [59.59444, 17.86667],
  [59.59611, 17.85944], [59.59806, 17.8525],
  [59.6, 17.84611], [59.6025, 17.84028],
  [59.605, 17.83472], [59.6075, 17.82972],
  [59.61028, 17.825], [59.61306, 17.82056],
  [59.61583, 17.81667], [59.61889, 17.81333],
  [59.62222, 17.81056], [59.62556, 17.80833],
  [59.62917, 17.80667], [59.63278, 17.80556],
  [59.63667, 17.80583], [59.67417, 17.83611],
  [59.6775, 17.83778], [59.68056, 17.84],
  [59.68361, 17.8425], [59.68667, 17.84556],
  [59.68944, 17.85], [59.6925, 17.85444],
  [59.695, 17.85944], [59.6975, 17.865],
  [59.7, 17.87056], [59.7025, 17.87639],
  [59.70472, 17.8825], [59.70667, 17.88917],
  [59.70833, 17.89583], [59.70972, 17.90278],
  [59.71083, 17.91], [59.71167, 17.91722]
  ];

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
    const convertedCoords = coordinatesDecimal.map(([lat, lng]) => ({ lat, lng }));
    const newZone = new ForbiddenZone(convertedCoords);
    updateZone(currZoneRef.current, newZone);
    setCurrZone((prev) => prev + 1);
  }, []);

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