// src/mapScripts/ForbiddenZoneDrawing.jsx
import { useEffect, useState } from 'react';
import { useMap, Circle } from 'react-leaflet';
import L from 'leaflet';

const nodeRadius = 20;

const ForbiddenZoneDrawing = () => {
  const map = useMap();
  let clickPoints = [];
  let tempPolygon = null;
  const [nodes, setNodes] = useState([]);
  let doubleClickHandler = null; // Track the double-click handler

  useEffect(() => {
    const handleClick = (e) => {
      if (!map.forbiddenManager) return;

      clickPoints.push(e.latlng);
      AddNode(e, setNodes);

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
      <DrawNodes nodes={nodes}/>
    </>
  );
};

function AddNode(e, setNodes) {
    const newNode = {
        position: e.latlng,
        radius: nodeRadius,
    }
    setNodes((prevNodes) => [...prevNodes, newNode]);
}

function DrawNodes({nodes}) {
    return (
        <>
            {nodes.map((node, index) => { return(
                <Circle 
                key={index} center={node.position} radius={node.radius}
                color="red" fillColor="red" fillOpacity={0.5}/>
                )
            })}
        </>
    );
}

export default ForbiddenZoneDrawing;