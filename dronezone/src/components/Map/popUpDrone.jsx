
// Active drones in area, currently with dummy drones. 
import { useEffect, useState } from "react";
import { Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import droneIconUrl from "@/assets/icon.svg";
import { SelectedDronePanel } from "./selectedDronePanel";
import { useMap } from "react-leaflet";
import { useRef } from "react";
import "leaflet-arrowheads"; 
import { DroneHeatMap } from "./droneHeatMap";
import ActiveDrone from "../ActiveDrones/activeDrones";


import { createDronepathFromJSON } from '@/mapScripts/dronepathHandler';

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

export function PopUpDrone({drones}) {
    const [hoveredDrone, setHoveredDrone] = useState(null);
    const [clickedDrone, setClickedDrone] = useState(null);
    const selectedDrone = clickedDrone || hoveredDrone;

    const map = useMap();
    const [zoom, setZoom] = useState(map.getZoom());

    useEffect(() => {
        const handleZoom = () => setZoom(map.getZoom());
        map.on("zoom", handleZoom);
        return () => map.off("zoom", handleZoom); // cleanup
        }, [map]);
    
          
        const allActiveDrones = [
          new ActiveDrone("XYZ456", new L.LatLng(59.3287, 18.1712), 135, 89, null),
          new ActiveDrone("A73X9Z", new L.LatLng(59.4080, 17.9390), 45, 110, null),
          new ActiveDrone("M12KD7", new L.LatLng(59.4105, 17.9500), 90, 131, null),
          new ActiveDrone("X8W3P0", new L.LatLng(59.4052, 17.9555), 320, 7, null),
          new ActiveDrone("GOT789", new L.LatLng(57.7089, 11.9746), 60, 150, null),
          new ActiveDrone("GOT321", new L.LatLng(57.6950, 11.9820), 210, 85, null),
          new ActiveDrone("VAL001", new L.LatLng(59.5351, 18.0783), 45, 105, null),
          new ActiveDrone("VAL002", new L.LatLng(59.5270, 18.0455), 190, 122, null),
          new ActiveDrone("VAL003", new L.LatLng(59.5502, 18.0580), 270, 99, null),
          new ActiveDrone("KIS101", new L.LatLng(59.4031, 17.9522), 75, 88, null),
          new ActiveDrone("KIS102", new L.LatLng(59.4978, 17.9600), 110, 120, null),
          new ActiveDrone("SOL201", new L.LatLng(59.4421, 17.9435), 45, 105, null),
          new ActiveDrone("SOL202", new L.LatLng(59.4477, 17.9559), 110, 98, null),
          new ActiveDrone("SOL203", new L.LatLng(59.4540, 17.9592), 250, 112, null),
          new ActiveDrone("SOL204", new L.LatLng(59.4615, 17.9643), 70, 101, null),
          new ActiveDrone("SOL205", new L.LatLng(59.4692, 17.9466), 185, 127, null),
          new ActiveDrone("SOL206", new L.LatLng(59.4760, 17.9352), 315, 117, null),
          new ActiveDrone("SOL207", new L.LatLng(59.4704, 17.9201), 5, 91, null),
          new ActiveDrone("SOL208", new L.LatLng(59.4511, 17.9270), 200, 108, null),
          new ActiveDrone("SOL104", new L.LatLng(59.4725, 17.9420), 135, 90, null),
          new ActiveDrone("SOL105", new L.LatLng(59.4631, 17.9288), 180, 100, null),
          new ActiveDrone("SOL106", new L.LatLng(59.4479, 17.9488), 45, 110, null),
          new ActiveDrone("VAL104", new L.LatLng(59.5430, 18.0922), 310, 130, null),
          new ActiveDrone("VAL105", new L.LatLng(59.5201, 18.0635), 50, 118, null),
          new ActiveDrone("VAL106", new L.LatLng(59.5320, 18.0339), 210, 95, null),
          new ActiveDrone("JAR104", new L.LatLng(59.4450, 17.8251), 70, 105, null),
          new ActiveDrone("JAR105", new L.LatLng(59.4280, 17.8663), 330, 87, null),
          new ActiveDrone("JAR106", new L.LatLng(59.4125, 17.8527), 150, 113, null),
          new ActiveDrone("SOL001", new L.LatLng(59.4550, 17.9380), 130, 88, null),
          new ActiveDrone("SOL002", new L.LatLng(59.4672, 17.9703), 75, 140, null),
          new ActiveDrone("SOL003", new L.LatLng(59.4801, 17.9549), 310, 91, null),
          new ActiveDrone("JAR001", new L.LatLng(59.4200, 17.8330), 200, 110, null),
          new ActiveDrone("JAR002", new L.LatLng(59.4301, 17.8550), 20, 127, null),
          new ActiveDrone("JAR003", new L.LatLng(59.4395, 17.8422), 295, 97, null),
          new ActiveDrone("VAR001", new L.LatLng(59.3255, 18.3920), 90, 102, null),
          new ActiveDrone("VAR002", new L.LatLng(59.3321, 18.4162), 130, 94, null),
          new ActiveDrone("VAR003", new L.LatLng(59.3094, 18.4077), 270, 118, null),
          new ActiveDrone("VAR004", new L.LatLng(59.3152, 18.4491), 60, 87, null),
          new ActiveDrone("VAR005", new L.LatLng(59.3041, 18.4623), 200, 130, null),
          new ActiveDrone("VAR006", new L.LatLng(59.2875, 18.4744), 310, 98, null),
          new ActiveDrone("VAR007", new L.LatLng(59.2699, 18.5075), 15, 112, null),
          new ActiveDrone("VAR008", new L.LatLng(59.2523, 18.5643), 340, 91, null),
          new ActiveDrone("VAR009", new L.LatLng(59.2848, 18.5941), 80, 121, null),
          new ActiveDrone("VAR010", new L.LatLng(59.2999, 18.6480), 270, 105, null),
          new ActiveDrone("HUS001", new L.LatLng(59.4112, 17.9320), 120, 95, null),
          new ActiveDrone("HUS002", new L.LatLng(59.4095, 17.9403), 45, 110, null),
          new ActiveDrone("HUS003", new L.LatLng(59.4083, 17.9265), 290, 88, null),
          new ActiveDrone("HUS004", new L.LatLng(59.4141, 17.9431), 180, 104, null),
          new ActiveDrone("HUS005", new L.LatLng(59.4169, 17.9344), 320, 99, null),
          new ActiveDrone("HUS006", new L.LatLng(59.4062, 17.9369), 230, 112, null),
        ];
      
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
        function getAllActiveDrones() {
      
          const currArr = [];
      
          //Iterates over all of the current drones
          /*allActiveDrones.forEach((activeDrone, index) => {
            const did =  getInfoFromDrone(activeDrone);
            currArr[index] = did;
          }); */
      
          return allActiveDrones;
        }
      
        async function updateActiveDrones() {
          const data = await fetchData();
          buildActiveDrones(data);
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
              padding: 4px 16px;
              min-width: 130px; 
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
            <Marker position={[drone.lat + 0.0005, drone.lng + 0.0003, drone.altitude]} icon={labelIcon} interactive={false} />)}
            {zoom >= 15 && <ArrowPolyline positions={[position, headingEnd]} />}

           

            </div>
        );
      })}

      <SelectedDronePanel drone={selectedDrone}
      onClose={() => setClickedDrone(null)} />
    </>
  );
}


