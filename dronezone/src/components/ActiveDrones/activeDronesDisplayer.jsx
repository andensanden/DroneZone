import React from 'react';
import { useEffect } from 'react';

//----- ActiveDrone Class Import --------
import ActiveDrone from './activeDrones'

import { createDronepathFromJSON } from '@/mapScripts/dronepathHandler';

const backendURL = import.meta.env.VITE_BACKEND_URL;

export function ActiveDronesDisplayer() {

  const allActiveDrones = [new ActiveDrone("XYZ456", 59.3287, 18.1712, 135, 89, null),
  new ActiveDrone("A73X9Z", 59.4080, 17.9390, 45, 110, null),
  new ActiveDrone("M12KD7", 59.4105, 17.9500, 90, 131, null),
  new ActiveDrone("X8W3P0", 59.4052, 17.9555, 320, 7, null),
  new ActiveDrone("GOT789", 57.7089, 11.9746, 60, 150, null),
  new ActiveDrone("GOT321", 57.6950, 11.9820, 210, 85, null),
  new ActiveDrone("VAL001", 59.5351, 18.0783, 45, 105, null),
  new ActiveDrone("VAL002", 59.5270, 18.0455, 190, 122, null),
  new ActiveDrone("VAL003", 59.5502, 18.0580, 270, 99, null),
  new ActiveDrone("KIS101", 59.4031, 17.9522, 75, 88, null),
  new ActiveDrone("KIS102", 59.4978, 17.9600, 110, 120, null),
  new ActiveDrone("SOL201", 59.4421, 17.9435, 45, 105, null),
  new ActiveDrone("SOL202", 59.4477, 17.9559, 110, 98, null),
  new ActiveDrone("SOL203", 59.4540, 17.9592, 250, 112, null),
  new ActiveDrone("SOL204", 59.4615, 17.9643, 70, 101, null),
  new ActiveDrone("SOL205", 59.4692, 17.9466, 185, 127, null),
  new ActiveDrone("SOL206", 59.4760, 17.9352, 315, 117, null),
  new ActiveDrone("SOL207", 59.4704, 17.9201, 5, 91, null),
  new ActiveDrone("SOL208", 59.4511, 17.9270, 200, 108, null),
  new ActiveDrone("SOL104", 59.4725, 17.9420, 135, 90, null),
  new ActiveDrone("SOL105", 59.4631, 17.9288, 180, 100, null),
  new ActiveDrone("SOL106", 59.4479, 17.9488, 45, 110, null),
  new ActiveDrone("VAL104", 59.5430, 18.0922, 310, 130, null),
  new ActiveDrone("VAL105", 59.5201, 18.0635, 50, 118, null),
  new ActiveDrone("VAL106", 59.5320, 18.0339, 210, 95, null),
  new ActiveDrone("JAR104", 59.4450, 17.8251, 70, 105, null),
  new ActiveDrone("JAR105", 59.4280, 17.8663, 330, 87, null),
  new ActiveDrone("JAR106", 59.4125, 17.8527, 150, 113, null),
  new ActiveDrone("SOL001", 59.4550, 17.9380, 130, 88, null),
  new ActiveDrone("SOL002", 59.4672, 17.9703, 75, 140, null),
  new ActiveDrone("SOL003", 59.4801, 17.9549, 310, 91, null),
  new ActiveDrone("JAR001", 59.4200, 17.8330, 200, 110, null),
  new ActiveDrone("JAR002", 59.4301, 17.8550, 20, 127, null),
  new ActiveDrone("JAR003", 59.4395, 17.8422, 295, 97, null),
  new ActiveDrone("VAR001", 59.3255, 18.3920, 90, 102, null),
  new ActiveDrone("VAR002", 59.3321, 18.4162, 130, 94, null),
  new ActiveDrone("VAR003", 59.3094, 18.4077, 270, 118, null),
  new ActiveDrone("VAR004", 59.3152, 18.4491, 60, 87, null),
  new ActiveDrone("VAR005", 59.3041, 18.4623, 200, 130, null),
  new ActiveDrone("VAR006", 59.2875, 18.4744, 310, 98, null),
  new ActiveDrone("VAR007", 59.2699, 18.5075, 15, 112, null),
  new ActiveDrone("VAR008", 59.2523, 18.5643, 340, 91, null),
  new ActiveDrone("VAR009", 59.2848, 18.5941, 80, 121, null),
  new ActiveDrone("VAR010", 59.2999, 18.6480, 270, 105, null),
  new ActiveDrone("HUS001", 59.4112, 17.9320, 120, 95, null),
  new ActiveDrone("HUS002", 59.4095, 17.9403, 45, 110, null),
  new ActiveDrone("HUS003", 59.4083, 17.9265, 290, 88, null),
  new ActiveDrone("HUS004", 59.4141, 17.9431, 180, 104, null),
  new ActiveDrone("HUS005", 59.4169, 17.9344, 320, 99, null),
  new ActiveDrone("HUS006", 59.4062, 17.9369, 230, 112, null),
  ];

  /*constructor(){
        // Dynamically create ActiveDrone instances and add them to the allActiveDrones array
        
        //Temp data, this will be updated
        const data = fetchData(); 
        const dronepaths = fetchPaths(data);
        console.log(dronepaths[0]);
        const droneData = [
          {id: 'ABC123', flightPath: null },
          { id: 'DEF456', flightPath: null },
          { id: 'GHI789', flightPath: null },
          { id: 'JKL123', flightPath: null },
          // Add more drone data as needed
        ];

        droneData.forEach(data => {
          const drone = new ActiveDrone(data.id, data.flightPath);
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
        id: d.id,
        flightPath: dronepaths[idx] || null,
      }));
  
      droneData.forEach((data) => {
        const drone = new ActiveDrone(data.id, data.flightPath);
        allActiveDrones.push(drone);
      });
    }
  
    init(); // Call the async function
      }, []);

  //Returns all of the active drones Info
  function getAllActiveDrones() {

    const currArr = [];

    //Iterates over all of the current drones
    /*allActiveDrones.forEach((activeDrone, index) => {
      const did =  getInfoFromDrone(activeDrone);
      currArr[index] = did;
    }); */

    return allActiveDrones;
  }

  function updateArray(){
    // Remove previous data
     allActiveDrones.splice(0,  allActiveDrones.length);
    
    //Temp data, this will be replaced with a database query
    const newDroneData = [
      {id: 'henri1a', flightPath: null },
      // Add more drone data as needed
    ];

    //Write new data gathered from the Database query
    newDroneData.forEach(data => {
      const drone = new ActiveDrone(data.id, data.flightPath);
       allActiveDrones.push(drone);
    });

  };

  function getDroneID(activeDrone){

    return activeDrone.id;

  };

  function getInfoFromDrone(ActiveDrone){

    const droneInfo = {
      id: ActiveDrone.id,
      flightPath: ActiveDrone.flightPath,
      lng: ActiveDrone.lng, 
      lat: ActiveDrone.lat,
    };
}
}