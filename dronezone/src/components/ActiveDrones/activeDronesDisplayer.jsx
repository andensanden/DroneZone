import React from 'react';
import { useEffect, useRef } from 'react';

//----- ActiveDrone Class Import --------
import ActiveDrone from './activeDrones'

import { createDronepathFromJSON } from '@/mapScripts/dronepathHandler';

const backendURL = import.meta.env.VITE_BACKEND_URL;

export function ActiveDronesDisplayer() {

  const allActiveDrones = [];
  const droneDataRef = useRef([]); // Use droneDataRef.current to access the array

  useEffect(() => {
    updateActiveDrones();
  }, []);

  function buildActiveDrones(data) {
    const droneData = [];
    data.forEach((dataObject) => {
      const newDrone = new ActiveDrone(dataObject.deviceID,
        getLatLng(dataObject.currentPosition),
        createDronepathFromJSON(dataObject.dronePath));
      droneData.push(newDrone);
    });
    droneDataRef.current = droneData;
  }

  function getLatLng(posJSON) {
    const posArray = JSON.parse(posJSON);
    return L.latLng(posArray);
  }

  async function fetchData() {
    const response = await fetch(`${backendURL}/api/drone/activeDrones`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  }

  //Returns all of the active drones Info
  function getAllActive() {

    const currArr = [];

    //Iterates over all of the current drones
    allActiveDrones.forEach((activeDrone, index) => {
      const dID =  getInfoFromDrone(activeDrone);
      currArr[index] = dID;
    });

    return currArr;
  }

  async function updateActiveDrones() {
    const data = await fetchData();
    buildActiveDrones(data);
  };

  function getDroneID(activeDrone){

    return activeDrone.ID;

  };

  function getInfoFromDrone(ActiveDrone){

    const droneInfo = {
      ID: ActiveDrone.ID,
      flightPath: ActiveDrone.flightPath,
      longitude: ActiveDrone.longitude, 
      latitude: ActiveDrone.latitude
    };
}
}