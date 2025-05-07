
import { DroneClient } from "./socketClient.js";

const droneClient = 
new DroneClient("0e0b3151-434f-4254-b867-c5d69df30783",
  "d7fdfdd6-e33a-4fda-a73d-0bbc43ba4804", 
  {"route": [{ lat: 0, lng: 0, alt: 0}, { lat: 1, lng: 1, alt: 1}, { lat: 2, lng: 2, alt: 2}]},  
  { lat: 0, lng: 0, alt: 0},);


droneClient.clientInit();

//Needs to send data to server when coneecting to server
