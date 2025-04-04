// src/mapScripts/forbiddenZoneDrawing.jsx
import { useEffect, useState } from 'react';
import { useMap, Circle } from 'react-leaflet';
import ForbiddenZonesManager from '@/mapScripts/forbiddenZone';

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

// Drawing Mode Control
const DrawingModeControl = ({ drawingMode, setDrawingMode }) => {
  return (
    <div className="drawing-mode-control" style={{
      position: 'absolute',
      top: '85%',
      right: '0%',
      zIndex: 1000,
    }}>
      <button 
        onClick={() => setDrawingMode('path')}
        style={{
          padding: '8px 16px',
          backgroundColor: drawingMode === 'path' ? '#4CAF50' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '4px 0 0 4px',
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        }}
      >
        Draw Path
      </button>
      <button 
        onClick={() => setDrawingMode('forbidden')}
        style={{
          padding: '8px 16px',
          backgroundColor: drawingMode === 'forbidden' ? '#f44336' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '0 4px 4px 0',
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        }}
      >
        Draw Forbidden Zone
      </button>
    </div>
  );
};

// Forbidden Zones Initializer
const ForbiddenZonesInitializer = () => {
  const map = useMap();
  
  useEffect(() => {
    const forbiddenManager = new ForbiddenZonesManager(map);
    map.forbiddenManager = forbiddenManager;
    
    return () => {
      forbiddenManager.clearForbiddenZones();
    };
  }, [map]);

  return null;
};

export { ForbiddenZoneDrawing, DrawingModeControl, ForbiddenZonesInitializer };