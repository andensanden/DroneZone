import { useEffect, useState, useRef } from 'react'
import { useMap, Popup } from 'react-leaflet'
import { Node } from './node.js'
import { DrawNodes, DrawPaths, DrawBufferZones } from './drawFunctions.jsx'
import { wouldLineIntersectForbiddenZone } from './intersectHandler.js'
import { useZones } from './ZonesContext.jsx'

/*
    Handles what happens when the user clicks on the map
*/
function MapClick({ drawingMode }) {
    const [popupPos, setPopupPos] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const map = useMap();
    const doNotDraw = useRef(false); // not needed anymore?
    const [nodes, setNodes] = useState([]); // nodes list
    const [paths, setPaths] = useState([]); // paths list
    const [bufferZones, setBufferZones] = useState([]); // bufferzone list
    const { zones } = useZones();

    const onMapClick = (e) => {
        if (drawingMode === 'path') {
        // Only create a new node upon clicking map, not buttons or other UI elements
        if (!e.originalEvent.target.classList.contains("leaflet-container")
            && !e.originalEvent.target.classList.contains("map-clickable")) return;

            const newNode = new Node(e.latlng);
            newNode.addNode(nodes, setNodes);

            

            
        }
        // Remove nodes by clicking on them
        else if (drawingMode === 'remove') {
           const index = nodes.findIndex(node => e.latlng.distanceTo(node.position) <= node.radius);
           if (index !== -1) {
                for (var i = 0; i < nodes.length; i++) {
                    if (ClickOnNode(e, nodes[i])) {
                        doNotDraw.current = true;
                        nodes[i].removeNode(setNodes);
                    }
                }
           }
        }
    }

    // Update paths whenever nodes is updated
    useEffect(() => {
        //Avoid creating new path when we remove a node
        if(doNotDraw.current){
            doNotDraw.current = false;
            BuildPath(nodes, setPaths);
            BuildBuffer(nodes, setBufferZones);
            return;
        }

        let n = nodes[nodes.length-1];
        // Check if nodes overlap
        if (n) {
            let overlapNode = n.overlapNode(nodes);
            if (overlapNode) {
                n.position = overlapNode.position;
                n.visible = false;
            }
        }

        //Detect if the user draw on a red zone
        
        if (nodes.length > 0) {
            const node = nodes[nodes.length - 1];
            const coords = nodes.slice(0, -1).map(n => n.position);
        
            const blocked = wouldLineIntersectForbiddenZone(node.position, coords, zones);
            /* Detect if path intersect with a red zone (user draws a path where a
            red zone ends up between two nodes).
            */
            if (blocked) {
                doNotDraw.current = true;
                nodes[nodes.length - 1].removeNode(setNodes);
                setPopupPos(node.position);
                setShowPopup(true);
                



            }
            
        }

        // Create a path between two nodes
        if (nodes.length > 1) {
            BuildPath(nodes, setPaths);
            BuildBuffer(nodes, setBufferZones);
        } else { // if nodes are less than 1, there should be no paths or bufferzones
            setPaths([]);
            setBufferZones([]);
        }
        
    }, [nodes])

// Adds a map click listener and updates it when the drawing mode changes.
    useEffect(() => {
        map.on('click', onMapClick) 

        return () => {
            map.off('click', onMapClick)
        }
    }, [map, drawingMode])

    return (
        <>
            <DrawNodes nodes={nodes} color="blue"/>
            <DrawPaths paths={paths}/>
            <DrawBufferZones bufferZones={bufferZones}/>
            {showPopup && popupPos && (
  <Popup position={popupPos} onClose={() => setShowPopup(false)}>
    ⚠️ You cannot draw through or on a red zone ⚠️.
  </Popup>
)}


            <div className="Undo-button" style={{
                        position: 'absolute',
                        top: '68%',
                        right: '0%',
                        zIndex: 1000,
                    }}>
                        <button
                            onClick={() => Undo(nodes, setNodes, doNotDraw) }
            
                            style={{
                                padding: '8px 16px',
                                backgroundColor: 'grey',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px 0 0 4px',
                                cursor: 'pointer',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                            }}
            
                        >
                            Undo
                        </button>
                    </div>
        </>
    )
}

/*
    Builds the path based on the existing nodes
*/
function BuildPath(nodes, setPaths) {
    const path = [];
    for (var i = 0; i < nodes.length-1; i++) {
        path.push([nodes[i].position, nodes[i+1].position]);
    }
    setPaths(path);
}

/*
    Builds the buffer zone based on the existing nodes
*/
function BuildBuffer(nodes, setBufferZones) {
    const buffer = [];
    const bufferWidth = 40;
    for (var i = 0; i < nodes.length-1; i++) {
        buffer.push(CreateBufferCoords([nodes[i].position, nodes[i+1].position], bufferWidth));
    }
    setBufferZones(buffer);
}

/*
    Calculates the offset of the buffer zone coordinates from the path between the nodes.
    These coordinates are used in AddBufferZone to create the polygon.
*/
function CreateBufferCoords(coords, widthMeters) {
    if (coords.length < 2) return [];
    
    const halfWidth = widthMeters / 2 / 111320; // Approx meters to degrees
    let leftSide = [];
    let rightSide = [];
    
    const p1 = coords[0];
    const p2 = coords[1];
    const angle = Math.atan2(p2.lat - p1.lat, p2.lng - p1.lng);
    const perpAngle = angle + Math.PI/2;
    
    // Calculate offset points
    leftSide.push([
        p1.lat + Math.sin(perpAngle) * halfWidth,
        p1.lng + Math.cos(perpAngle) * halfWidth
    ]);
    rightSide.push([
        p1.lat - Math.sin(perpAngle) * halfWidth,
        p1.lng - Math.cos(perpAngle) * halfWidth
    ]);
    leftSide.push([
        p2.lat + Math.sin(perpAngle) * halfWidth,
        p2.lng + Math.cos(perpAngle) * halfWidth
    ]);
    rightSide.push([
        p2.lat - Math.sin(perpAngle) * halfWidth,
        p2.lng - Math.cos(perpAngle) * halfWidth
    ]);
    
    return leftSide.concat(rightSide.reverse());
}

// Remove last drawn node.
function Undo(nodes, setNodes, doNotDraw) {
    doNotDraw.current = true;
    nodes[nodes.length - 1].removeNode(setNodes);
}

// check if the user clicked on a node
function ClickOnNode(e, node) {
    const dist = e.latlng.distanceTo(node.position);
    return dist <= node.radius;
}


export default MapClick;