
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
import { ActiveDronesDisplayer } from "../ActiveDrones/activeDronesDisplayer";


const droneIcon = new L.Icon({
  iconUrl: droneIconUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const dummyDrones = [

];


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
    
          //Heatmap
            if (zoom < 14) {
                return <DroneHeatMap droneData={dummyDrones} />;
              }

  return (
    <>
    
      {drones.map((drone) => {
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


