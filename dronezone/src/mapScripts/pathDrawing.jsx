import { useEffect, useState } from 'react'
import { useMap } from 'react-leaflet'
import { Node } from './node.js'
import { DrawNodes, DrawPaths, DrawBufferZones } from './drawFunctions.jsx'

/*
    Handles what happens when the user clicks on the map
*/
function MapClick() {
    const map = useMap()
    const [nodes, setNodes] = useState([])
    const [paths, setPaths] = useState([])
    const [bufferZones, setBufferZones] = useState([])
    let newNode;

    const onMapClick = (e) => {
        // Only create a new node upon clicking map, not buttons or other UI elements
        if (e.originalEvent.target.classList.contains("leaflet-container")
            || e.originalEvent.target.classList.contains("map-clickable")) {
            newNode = new Node(e.latlng);
            newNode.addNode(nodes, setNodes);
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

        if (nodes.length > 1) {
            AddPath(nodes[nodes.length-2], n, setPaths)
            AddBufferZone(nodes[nodes.length-2], n, setBufferZones)
        }
    }, [nodes])

    useEffect(() => {
        map.on('click', onMapClick) 

        return () => {
            map.off('click', onMapClick)
        }
    }, [map])

    return (
        <>
            <DrawNodes nodes={nodes} color="blue"/>
            <DrawPaths paths={paths}/>
            <DrawBufferZones bufferZones={bufferZones}/>
        </>
    )
}

/*
    Add a new path to the array of paths
*/
function AddPath(startNode, endNode, setPaths) {
    const newPath = [startNode.position, endNode.position]
    setPaths((prevPaths) => [...prevPaths, newPath])
}

/*
    Add a new buffer zone to the buffer zone array
*/
function AddBufferZone(startNode, endNode, setBufferZones) {
    const bufferWidth = 40;
    const newZone = CreateBufferCoords([startNode.position, endNode.position], bufferWidth)
    setBufferZones((prevZones) => [...prevZones, newZone])
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

export default MapClick