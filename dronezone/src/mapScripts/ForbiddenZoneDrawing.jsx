// src/mapScripts/forbiddenZoneDrawing.jsx
import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import ForbiddenZonesManager from '@/mapScripts/forbiddenZonesManager.js';
import { Node } from './node.js'
import { DrawNodes } from './drawFunctions.jsx';

function ForbiddenZoneDrawing() {
  const map = useMap();
  let clickPoints = [];
  let tempPolygon = null;
  const [nodes, setNodes] = useState([]);
  let doubleClickHandler = null; // Track the double-click handler

  useEffect(() => {
    const handleClick = (e) => {
      // Return if either not in forbidden mode or if the click is on a UI element (such as a button)
      if (!map.forbiddenManager || !e.originalEvent.target.classList.contains('leaflet-container')) return;

      clickPoints.push(e.latlng);
      new Node(e.latlng).addNode(nodes, setNodes);

      // Draw temporary polygon
      if (tempPolygon) tempPolygon.remove();
      if (clickPoints.length > 2) {
        tempPolygon = map.forbiddenManager.drawForbiddenPoly(clickPoints);
      }

      // Only set up double-click handler if not already set
      if (!doubleClickHandler) {
        doubleClickHandler = () => {
          if (map.forbiddenManager && clickPoints.length >= 3) {
            map.forbiddenManager.drawForbiddenPoly(clickPoints);
            clickPoints = [];
            if (tempPolygon) {
              tempPolygon.remove();
              tempPolygon = null;
            }
            map.doubleClickZoom.enable();
            map.off('dblclick', doubleClickHandler);
            doubleClickHandler = null;
          }
        };
        map.doubleClickZoom.disable();
        map.on('dblclick', doubleClickHandler);
      }
    };

    map.on('click', handleClick);

    return () => {
      // Clean up ALL event handlers when component unmounts
      map.off('click', handleClick);
      if (doubleClickHandler) {
        map.off('dblclick', doubleClickHandler);
        map.doubleClickZoom.enable();
      }
      if (tempPolygon) tempPolygon.remove();
    };
  }, [map]);

  return (
    <>
      <DrawNodes nodes={nodes} color="red" />
    </>
  );
}

// Forbidden Zones Initializer
function ForbiddenZonesInitializer() {
  const map = useMap();

  useEffect(() => {
    const forbiddenManager = new ForbiddenZonesManager(map);
    map.forbiddenManager = forbiddenManager;

    return () => {
      forbiddenManager.clearForbiddenZones();
    };
  }, [map]);

  return null;
}

export { ForbiddenZoneDrawing, ForbiddenZonesInitializer };