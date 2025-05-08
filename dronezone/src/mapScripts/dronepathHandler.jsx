import { useEffect, useState, useRef } from "react";
import { Dronepath } from "./dronepath";
import { DrawNodes, DrawPaths, DrawBufferZones } from './drawFunctions.jsx'
import { Node } from "./node";
import { useDronepaths } from "./dronepathsContext";
import L from "leaflet";
import { DroneClient } from "./socketClient";
import { supabase } from "@/supabase/config";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export let droneClient = null;

/**
 * Fetches and sends all dronepaths to and from the database.
 * @returns Draws all dronepaths on the map.
 */
export function DronepathHandler() {
    const { dronepaths, addDronepath } = useDronepaths();

    useEffect(() => {
    async function fetchData() {
        const response = await fetch(backendURL + "/api/drone/activeDrones", 
                        {method: "GET", headers: { "Content-Type": "application/json"}});
        const data = await response.json();

        let dronepaths = [];
        data.forEach((dataObject, index) => {
            dronepaths.push(dataObject.dronePath);
        })
        
        dronepaths.forEach((dronepathJSON, index) => {
            const newDronepath = createDronepathFromJSON(dronepathJSON);
            addDronepath(newDronepath);
        })
        }
        fetchData();
    }, []);

    return (
        <>
            {dronepaths.map((dronepath, index) => (
                <DrawDronepath key={index} dronepath={dronepath} color={dronepath.color}/>
            ))}
        </>
    );
}

/**
 * Adds a new dronepath based on an array of nodes, then sends that dronepath to the database. This is mainly used in pathDrawing for saving a planned path.
 * @param {*} nodes An array of nodes which will be used for the dronepath.
 * @param {*} addDronepath The function (from dronepathsContext) which adds the dronepath to the array of dronepaths.
 */
export async function CreateDronepath(nodes, addDronepath, position) {
    const newDronepath = new Dronepath(1, "blue");
    for (var i = 0; i < nodes.length; i++) {
        newDronepath.addNode(nodes[i]);
    }
    addDronepath(newDronepath);
    sendDronepathToDatabase(newDronepath, position);
}

async function sendDronepathToDatabase(dronepath, position) {
    const dronepathJSON = createPathJSON(dronepath);
    const positionJSON = createPathJSON(position);
    const userID = await getUserID();
    droneClient = new DroneClient(userID, "d7fdfdd6-e33a-4fda-a73d-0bbc43ba4804", 
        positionJSON, dronepathJSON);
    droneClient.clientInit();
}

async function getUserID() {
    const userID = await supabase.auth.getUser();
    return userID.data.user.id;
}

/**
 * Draws a dronepath on the map.
 */
function DrawDronepath({ dronepath, color }) {
    return (
        <>
            <DrawNodes nodes={dronepath.nodes} color={color}/>
            <DrawPaths paths={dronepath.paths} color={color}/>
            <DrawBufferZones bufferZones={dronepath.bufferZones} color={color}/>
        </>
    )
}

/**
 * Converts a dronepath object to a JSON object.
 * @param {*} dronepath The dronepath to convert.
 * @returns A dronepath JSON object.
 */
function createPathJSON(dronepath) {
  return JSON.stringify(dronepath);
}

/**
 * Converts a dronepath JSON to a dronepath object.
 * @param {*} pathJSON The dronepath JSON to convert.
 * @returns A dronepath object.
 */
export function createDronepathFromJSON(pathJSON) {
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

export function EndFlight() {
    const temporaryFlightTime = 5;  // For testing, remove when actual time is added
    droneClient.endFlight(temporaryFlightTime);
}