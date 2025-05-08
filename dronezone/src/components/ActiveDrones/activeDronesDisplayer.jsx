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
    async function initActiveDrones() {
      const data = await fetchData();
      buildActiveDrones(data);
    }
    initActiveDrones();
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

  function updateArray(){
    // Remove previous data
     allActiveDrones.splice(0,  allActiveDrones.length);
    
    //Temp data, this will be replaced with a database query
    const newDroneData = [
      { ID: 'henri1a', flightPath: null },
      // Add more drone data as needed
    ];

    //Write new data gathered from the Database query
    newDroneData.forEach(data => {
      const drone = new ActiveDrone(data.ID, data.flightPath);
       allActiveDrones.push(drone);
    });

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