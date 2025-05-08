import React from 'react';

//----- ActiveDrone Class Import --------
import ActiveDrone from './activeDrones'

import { createDronepathFromJSON } from '@/mapScripts/dronepathHandler';



export class ActiveDronesDisplayer {

  allActiveDrones = [];

  constructor(){
        // Dynamically create ActiveDrone instances and add them to the allActiveDrones array
        
        //Temp data, this will be updated 
        const droneData = [
          { ID: 'ABC123', flightPath: null },
          { ID: 'DEF456', flightPath: null },
          { ID: 'GHI789', flightPath: null },
          { ID: 'JKL123', flightPath: null },
          // Add more drone data as needed
        ];

        droneData.forEach(data => {
          const drone = new ActiveDrone(data.ID, data.flightPath);
          this.allActiveDrones.push(drone);
        });
  }

  //Returns all of the active drones Info
  getAllActive() {

    const currArr = [];

    //Iterates over all of the current drones
    this.allActiveDrones.forEach((activeDrone, index) => {
      const dID = this.getInfoFromDrone(activeDrone);
      currArr[index] = dID;
    });

    return currArr;
  }

  updateArray(){
    // Remove previous data
    this.allActiveDrones.splice(0, this.allActiveDrones.length);
    
    //Temp data, this will be replaced with a database query
    const newDroneData = [
      { ID: 'henri1a', flightPath: null },
      // Add more drone data as needed
    ];

    //Write new data gathered from the Database query
    newDroneData.forEach(data => {
      const drone = new ActiveDrone(data.ID, data.flightPath);
      this.allActiveDrones.push(drone);
    });

  };

  getDroneID(activeDrone){

    return activeDrone.ID;

  };

  getInfoFromDrone(ActiveDrone){

    const droneInfo = {
      ID: ActiveDrone.ID,
      flightPath: ActiveDrone.flightPath,
      longitude: ActiveDrone.longitude, 
      latitude: ActiveDrone.latitude
    };

    async function fetchPaths(data) {
      const dronepathJSONS = [];
      data.forEach((dataObject, index) => {
          dronepathJSONS.push(dataObject.dronePath);
      })

      const dronepaths = [];
      dronepathJSONS.forEach((dronepathJSON, index) => {
        const newDronepath = createDronepathFromJSON(dronepathJSON);
        dronepaths.push(newDronepath);
      })

      return dronepaths;
    }

    async function fetchIDs() {

    }

    async function fetchData() {
      const response = await fetch(backendURL + "/api/drone/activeDrones", 
                      {method: "GET", headers: { "Content-Type": "application/json"}});
      const data = await response.json();

      return data;
      }

    return droneInfo;
  };
};