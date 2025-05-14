import { Dronepath } from "./dronepath";
import { Node } from "./node";
import L from "leaflet";
import { DroneClient } from "./socketClient";
import { supabase } from "@/supabase/config";

export let droneClient;

/**
 * Adds a new dronepath based on an array of nodes, then sends that dronepath to the database. This is mainly used in pathDrawing for saving a planned path.
 * @param {*} nodes An array of nodes which will be used for the dronepath.
 * @param {*} addDronepath The function (from dronepathsContext) which adds the dronepath to the array of dronepaths.
 */
export async function CreateDronepath(nodes, position, currentDeviceID, dispatch) {
    const newDronepath = new Dronepath();
    for (var i = 0; i < nodes.length; i++) {
        newDronepath.addNode(nodes[i]);
    }
    sendDronepathToDatabase(newDronepath, position, currentDeviceID, dispatch);
}

async function sendDronepathToDatabase(dronepath, position, currentDeviceID, dispatch) {
    const dronepathJSON = createPathJSON(dronepath);
    const positionJSON = createPathJSON(position);
    const userID = await getUserID();
    createSocketClient(userID, currentDeviceID, positionJSON, dronepathJSON, dispatch);
    droneClient.launchFlight();
}

export function createSocketClient(userID, currentDeviceID, positionJSON, dronepathJSON, dispatch) {
  if (droneClient) return;

  droneClient = new DroneClient(userID, currentDeviceID, 
        positionJSON, dronepathJSON, dispatch);
  droneClient.clientInit();
}

async function getUserID() {
    const userID = await supabase.auth.getUser();
    return userID.data.user.id;
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
  const dronepath = new Dronepath();

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
    droneClient = null;
}