import { useEffect, useState } from 'react'
import { useMap } from 'react-leaflet'
import { Node } from './node.js'
import { DrawNodes, DrawPaths, DrawBufferZones } from './drawFunctions.jsx'
import { wouldLineIntersectForbiddenZone } from './intersectHandler.js'
import { useZones } from './ZonesContext.jsx'
import { useNodes } from './nodesContext.jsx'

/*
    Handles what happens when the user clicks on the map
*/
function MapClick({ drawingMode }) {
    const map = useMap();
    const [paths, setPaths] = useState([]);
    const [bufferZones, setBufferZones] = useState([]);
    const { nodes, setNodes } = useNodes();
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
                        nodes[i].removeNode(setNodes);
                    }
                }
           }
        }
    }

    // Update paths whenever nodes is updated
    useEffect(() => {
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
        if (nodes.length > 1) {
            const node = nodes[nodes.length - 1];
            const coords = nodes.slice(0, -1).map(n => n.position);
        
            const blocked = wouldLineIntersectForbiddenZone(node.position, coords, zones);
            /* Detect if path intersect with a red zone (user draws a path where a
            red zone ends up between two nodes).
            */
            if (blocked) {
                nodes[nodes.length - 1].removeNode(setNodes);
                alert("Path intersects forbidden zone — node removed.");
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

// Adds a map click listener (useEffect) and updates it when the drawing mode changes.
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

function ClickOnNode(e, node) {
    const dist = e.latlng.distanceTo(node.position);
    return dist <= node.radius;
}

export default MapClick;