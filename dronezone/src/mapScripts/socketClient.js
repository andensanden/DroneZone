import { io } from "socket.io-client";
import { setTakeDownDroneTrue } from "@/Redux/event/eventSlice.js";


//TODO: State management and error handling need to be implemented on the client side,
// this should be handeled under the clientInit method for the different events

/**
 * -- The class is used to send the flight data to the server and receive data from the server
 */
export class DroneClient{


    constructor(userID, deviceID, currentPosition, flyingRoute, dispatch) {

        this.userID = userID;
        this.deviceID = deviceID;
        this.flyingRoute = flyingRoute;
        this.currentPosition = currentPosition;
        this.activeFlight = true;
        this.dispatch = dispatch;

        //Connect to server and setting up socket
        this.socket = io("http://localhost:8080", { 
            auth:{
                userID: userID,
                deviceID: deviceID,
                flyingRoute: flyingRoute,
                currentPosition: currentPosition,
                activeFlight: true
            }
        });

    }

    clientInit(){

      // Event that is being sent when the client successfully connected to the server
      this.socket.on("connect", () => {
        console.log("Connected to server");
      });

      // Event that is being sent when the client could not connect to the server
      this.socket.on("connect_error", (error) => {

        //TODO: Handle this error? add state, show error toast message
        console.log("Connection error:", error);
      });


      // Event is being sent when server could'nt store flight data, then user should not be able to fly
      this.socket.on("flight_record_error", (error) => {
        //TODO: Handle this error? add state, show error toast message
        console.log("Flight record error:", error);
        this.socket.disconnect();
      })

      // Event is being sent when server successfully stored flight data
      this.socket.on("flight_record_success", (data) => {
        console.log(data);
      })

      // Event is being sent when server could'nt store end flight data. Then the user need end flight again
      this.socket.on("flight_end_failed", (data) => {
        console.log(data);
      })

      // Event is being sent when server successfully stored end flight data, end flight is now possible
      this.socket.on("flight_end_success", (data) => {
        console.log(data);
        this.socket.disconnect();
      })

      // Event that is being sent when a third party wants the drones to be taken down
      this.socket.on("takeDownDrone", (data) => {
          console.log(data);
          this.dispatch(setTakeDownDroneTrue());
          alert("TAKE DOWN DRONE");
        });
        
      // Event that is being sent when the client disconnects from the server
        this.socket.on("disconnect", () => {
          console.log("Disconnected from server");
        });
  }

  //Method for ending a flight

  /**
   * Ends the flight and sends the flight time to the server.
   * @param {number} flightTime - The flight time in seconds.
   */

  endFlight(flightTime) {
    this.activeFlight = false;
    this.socket.emit("endFlight", 
      { userID: this.userID, deviceID: this.deviceID,
        flightTime: flightTime, activeFlight: this.activeFlight });
  }
  

  /**
   * Sends the position data to the server.
   * @param {object} position - The position data to send.
   */
  // Update the position of the drone
  updatePosition(currentPosition, userID) {
    this.socket.emit("updatePosition", { userID, currentPosition });
  }
}