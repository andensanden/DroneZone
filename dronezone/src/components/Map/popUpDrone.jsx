
// Active drones in area
import { useEffect, useState, useRef } from "react";
import { Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import droneIconUrl from "@/assets/icon.svg";
import { SelectedDronePanel } from "./selectedDronePanel";
import { useMap } from "react-leaflet";
import "leaflet-arrowheads"; 
import { DroneHeatMap } from "./droneHeatMap";
import ActiveDrone from "../ActiveDrones/activeDrones";
import { SelectedDronepath } from "./selectedDronepath";
import { useSelector, useDispatch } from "react-redux";
import { useFlightMode } from "./inFlightContext";
import { setCurrentDeviceID } from "@/Redux/gpsPos/gpsPosSlice";


import { createDronepathFromJSON, createSocketClient } from '@/mapScripts/dronepathHandler.js';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const droneIcon = new L.Icon({
  iconUrl: droneIconUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});


function ArrowPolyline({ positions }) {
    const polylineRef = useRef();
    const map = useMap();
  
    useEffect(() => {
      if (polylineRef.current) {
        polylineRef.current.arrowheads({
          frequency: 'endonly', // only at the end
          size: '10px',
          fill: true,
          yawn: 60, // width of arrowhead angle
        });
      }
    }, [map, positions]);
    return <Polyline ref={polylineRef} positions={positions} color="gray" weight={2} />;
}

export function PopUpDrone({ launch }) {
    const [hoveredDrone, setHoveredDrone] = useState(null);
    const [clickedDrone, setClickedDrone] = useState(null);
    const selectedDrone = clickedDrone || hoveredDrone;

    const map = useMap();
    const [zoom, setZoom] = useState(map.getZoom());
    const [allActiveDrones, setAllActiveDrones] = useState([]);
    const hasChecked = useRef(false);
    const { userID } = useSelector((state) => state.auth);
    const { toggleMode } = useFlightMode();
    const dispatch = useDispatch();

    useEffect(() => {
        const handleZoom = () => setZoom(map.getZoom());
        map.on("zoom", handleZoom);
        return () => map.off("zoom", handleZoom);
        }, [map]);
      
        useEffect(() => {
          updateActiveDrones();
          setInterval(updateActiveDrones, 5000);
        }, []);
      
        function buildActiveDrones(data) {
          const droneData = [];
          data.forEach((dataObject) => {
            const newDrone = new ActiveDrone(dataObject.droneID,
              getLatLng(dataObject.currentPosition),
              5,
              100,
              createDronepathFromJSON(dataObject.dronePath));
            droneData.push(newDrone);
          });
          setAllActiveDrones(droneData);
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
      
        async function updateActiveDrones() {
          const data = await fetchData();
          if (!hasChecked.current) checkIfUserIsInFlight(data);
          buildActiveDrones(data);
        };

        function checkIfUserIsInFlight(data) {
          data.some((dataObject) => {
            if (dataObject.userID === userID) {
              toggleMode();
              createSocketClient(dataObject.userID, dataObject.deviceID, dataObject.currentPosition, dataObject.dronePath, dispatch);
              activateDrone(dataObject.deviceID);
            }
          });
          hasChecked.current = true;
        }

        function activateDrone(droneID) {
          dispatch(setCurrentDeviceID(droneID));
        }
      
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
              //Heatmap
            if (zoom < 14) {
                return <DroneHeatMap droneData={allActiveDrones} />;
              }

  return (
    <>
    
      {allActiveDrones.map((drone) => {
        const isActive =
        (hoveredDrone && hoveredDrone.id === drone.id) ||
        (clickedDrone && clickedDrone.id === drone.id);
      
        const position = [drone.lat, drone.lng, drone.altitude];
        const headingEnd = [
          drone.lat + 0.0005 * Math.sin((drone.heading * Math.PI) / 180),
          drone.lng + 0.0005 * Math.cos((drone.heading * Math.PI) / 180),
          drone.altitude + 0.0005 * Math.cos((drone.heading * Math.PI) / 180),
        ];


        const labelIcon = L.divIcon({
          className: "drone-label-icon",
          html: `
            <div style="
              background: #fff;
              border: 3px solid #555;
              border-radius: 2px;
              padding: 4px 10px;
              min-width: 100px; 
              font-family: monospace;
              font-weight: bold;
              font-size: 14px;
              position: relative;
              color: #555;
            ">
              ID: ${drone.id}
              <div style="
                position: absolute;
                bottom: -12px;
                left: 0px;
                width: 0;
                height: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-top: 12px solid #555;
              "></div>
            </div>
          `,
          iconAnchor: [20, 45],
        });

        return (
          <div key={drone.id}>
            
            <Marker
              position={position}
              icon={droneIcon}
              opacity={isActive ? 1.0 : 0.5}
              eventHandlers={{
                mouseover: () => {
                  if (!clickedDrone) setHoveredDrone(drone);
                },
                mouseout: () => {
                  if (!clickedDrone) setHoveredDrone(null);
                },
                click: () => {
                    if (clickedDrone?.id === drone.id) {
                      setClickedDrone(null); // same drone clicked → close panel
                    } else {
                      setClickedDrone(drone); // new drone clicked → open panel
                      setHoveredDrone(null);
                    }
                  },  }}
            />
            {zoom >= 15 && (
            <Marker position={[drone.lat + 0.00005, drone.lng + 0.00005 , drone.altitude]} icon={labelIcon} interactive={false} />)}
            {zoom >= 15 && <ArrowPolyline positions={[position, headingEnd]} />}

           

            </div>
        );
      })}

      <SelectedDronePanel drone={selectedDrone}
      onClose={() => setClickedDrone(null)} />
      <SelectedDronepath selectedDrone={selectedDrone} hoveredDrone={hoveredDrone}/>
    </>
  );
}


