import { useEffect, useState, useRef } from "react";
import { Dronepath } from "./dronepath";
import { DrawNodes, DrawPaths, DrawBufferZones } from './drawFunctions.jsx'
import { Node } from "./node";
import { useDronepaths } from "./dronepathsContext";
import L from "leaflet";

export function DronepathHandler() {
    const { dronepaths, addDronepath } = useDronepaths();
    const dronepathsRef = useRef(dronepaths);

    // Temporary for testing
    const [dronepathTest] = useState(() => {
        const path = new Dronepath(1);
        path.addNode(new Node(L.latLng(59.3250, 18.0708)));
        path.addNode(new Node(L.latLng(59.3470, 18.0726)));
        path.addNode(new Node(L.latLng(59.3326, 18.0649)));
        return path;
    });

    const [dronepathTest2] = useState(() => {
        const path = new Dronepath(1, "green");
        path.addNode(new Node(L.latLng(59.3275, 18.0546)));
        path.addNode(new Node(L.latLng(59.3178, 18.0845)));
        path.addNode(new Node(L.latLng(59.3240, 18.1030)));
        return path;
    });

    // Run once on initial mounting of component
    // Use this to fetch all dronepaths
    /*useEffect(() => {
    async function fetchData() {
        const response = await fetch("http://localhost:8080/api/zone/restricted", 
                        {method: "GET", headers: { "Content-Type": "application/json"}});
        const data = await response.json();
        
        data.forEach((dronepathJSON, index) => {
            const newDronepath = createDronepathFromJSON(dronepathJSON);
            setDronepaths((prevPaths) => {
                const newPaths = [...prevPaths, newDronepath];
                return newPaths;
            });
        })
        }
        fetchData();
    }, []);*/

    useEffect(() => {
        dronepathsRef.current = dronepaths;
        console.log("After dronepaths: ", dronepathsRef.current);
    }, [dronepaths]);

    useEffect(() => {
            if (dronepaths.length === 0) {
            addDronepath(dronepathTest);
            addDronepath(dronepathTest2);
            }
        }, [dronepaths, dronepathTest, dronepathTest2, addDronepath]);

    return (
        <>
            {dronepathsRef.current.map((dronepath, index) => (
                <DrawDronepath key={index} dronepath={dronepath} color={dronepath.color}/>
            ))}
        </>
    );
}

export function CreateDronepath(nodes, addDronepath, dronepaths) {
    console.log("Before dronepaths: ", dronepaths);
    const newDronepath = new Dronepath(1, "blue");
    for (var i = 0; i < nodes.length; i++) {
        console.log(nodes[i].position);
        newDronepath.addNode(nodes[i]);
    }
    addDronepath(newDronepath);
    console.log("After dronepaths: ", dronepaths);
    // Send newDronepath to database
}

function DrawDronepath({ dronepath, color }) {
    return (
        <>
            <DrawNodes nodes={dronepath.nodes} color={color}/>
            <DrawPaths paths={dronepath.paths} color={color}/>
            <DrawBufferZones bufferZones={dronepath.bufferZones} color={color}/>
        </>
    )
}

function createPathJSON(dronepath) {
  return JSON.stringify(dronepath);
}

function createDronepathFromJSON(pathJSON) {
  const data = JSON.parse(pathJSON);

  const dronepath = new Dronepath(1);

  data.nodes.forEach(nodeData => {
    const position = L.latLng(nodeData.position.lat, nodeData.position.lng);
    const node = new Node(position);
    node.visible = nodeData.visible;
    dronepath.addNode(node);
  });

  return dronepath;
}