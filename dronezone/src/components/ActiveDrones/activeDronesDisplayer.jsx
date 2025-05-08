import React from 'react';
import { useEffect } from 'react';

//----- ActiveDrone Class Import --------
import ActiveDrone from './activeDrones'

import { createDronepathFromJSON } from '@/mapScripts/dronepathHandler';

const backendURL = import.meta.env.VITE_BACKEND_URL;

export function ActiveDronesDisplayer() {

  const allActiveDrones = [];

  /*constructor(){
        // Dynamically create ActiveDrone instances and add them to the allActiveDrones array
        
        //Temp data, this will be updated
        const data = fetchData(); 
        const dronepaths = fetchPaths(data);
        console.log(dronepaths[0]);
        const droneData = [
          { ID: 'ABC123', flightPath: null },
          { ID: 'DEF456', flightPath: null },
          { ID: 'GHI789', flightPath: null },
          { ID: 'JKL123', flightPath: null },
          // Add more drone data as needed
        ];

        droneData.forEach(data => {
          const drone = new ActiveDrone(data.ID, data.flightPath);
           allActiveDrones.push(drone);
        });
  }*/

  useEffect(() => {
    async function init() {
      function fetchPaths(dataOb) {
        console.log(dataOb);
        const dronepathJSONS = [];
        dataOb.forEach((dataObject) => {
          dronepathJSONS.push(dataObject.dronePath);
        });
        console.log("JSONs: " + dronepathJSONS);
  
        const dronepaths = [];
        dronepathJSONS.forEach((dronepathJSON) => {
          const newDronepath = createDronepathFromJSON(dronepathJSON);
          dronepaths.push(newDronepath);
        });
        console.log("Dronepaths: ", dronepaths);
  
        return dronepaths;
      }
  
      async function fetchData() {
        const response = await fetch(`${backendURL}/api/drone/activeDrones`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        return await response.json();
      }
  
      const data = await fetchData();
      const dronepaths = fetchPaths(data); // Now data is an array
  
      console.log(dronepaths[0]);
  
      const droneData = data.map((d, idx) => ({
        ID: d.ID,
        flightPath: dronepaths[idx] || null,
      }));
  
      droneData.forEach((data) => {
        const drone = new ActiveDrone(data.ID, data.flightPath);
        allActiveDrones.push(drone);
      });
    }
  
    init(); // Call the async function
      }, []);

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