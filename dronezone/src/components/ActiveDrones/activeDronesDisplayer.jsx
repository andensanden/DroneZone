import React from 'react';

//----- ActiveDrone Class Import --------
import ActiveDrone from './activeDrones'



export class ActiveDronesDisplayer {

  /* [AD1, AD2, AD3, ...] */
  

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

  getDroneID(activeDrone){

    return activeDrone.ID;

  };

};