
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



const droneIcon = new L.Icon({
  iconUrl: droneIconUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const dummyDrones = [
//kista sollentuna
  { id: "ABC123", lat: 59.3999, lng: 18.0000, heading: 45, altitude: 50 },
  { id: "XYZ456", lat: 59.3287, lng: 18.1712, heading: 135, altitude: 89 },
  { id: "A73X9Z", lat: 59.4080, lng: 17.9390, heading: 45 ,altitude: 110},
  { id: "M12KD7", lat: 59.4105, lng: 17.9500, heading: 90 ,altitude: 131},
  { id: "X8W3P0", lat: 59.4052, lng: 17.9555, heading: 320, altitude: 7 },
  { id: "GOT789", lat: 57.7089, lng: 11.9746, heading: 60, altitude: 150 },
  { id: "GOT321", lat: 57.6950, lng: 11.9820, heading: 210, altitude: 85 },
  { id: "VAL001", lat: 59.5351, lng: 18.0783, heading: 45, altitude: 105 },
  { id: "VAL002", lat: 59.5270, lng: 18.0455, heading: 190, altitude: 122 },
  { id: "VAL003", lat: 59.5502, lng: 18.0580, heading: 270, altitude: 99 },
  { id: "KIS101", lat: 59.4031, lng: 17.9522, heading: 75, altitude: 88 },
  { id: "KIS102", lat: 59.4978, lng: 17.9600, heading: 110, altitude: 120 },
  { id: "SOL201", lat: 59.4421, lng: 17.9435, heading: 45, altitude: 105 },  // Edsviken
  { id: "SOL202", lat: 59.4477, lng: 17.9559, heading: 110, altitude: 98 },  // Tureberg
  { id: "SOL203", lat: 59.4540, lng: 17.9592, heading: 250, altitude: 112 }, // Tureberg east
  { id: "SOL204", lat: 59.4615, lng: 17.9643, heading: 70, altitude: 101 },  // near Helenelund
  { id: "SOL205", lat: 59.4692, lng: 17.9466, heading: 185, altitude: 127 }, // Norrviken
  { id: "SOL206", lat: 59.4760, lng: 17.9352, heading: 315, altitude: 117 }, // Rotebro center
  { id: "SOL207", lat: 59.4704, lng: 17.9201, heading: 5, altitude: 91 },    // north of Rotebro
  { id: "SOL208", lat: 59.4511, lng: 17.9270, heading: 200, altitude: 108 },
  { id: "SOL104", lat: 59.4725, lng: 17.9420, heading: 135, altitude: 90 },
  { id: "SOL105", lat: 59.4631, lng: 17.9288, heading: 180, altitude: 100 },
  { id: "SOL106", lat: 59.4479, lng: 17.9488, heading: 45, altitude: 110 },
  { id: "VAL104", lat: 59.5430, lng: 18.0922, heading: 310, altitude: 130 },
  { id: "VAL105", lat: 59.5201, lng: 18.0635, heading: 50, altitude: 118 },
  { id: "VAL106", lat: 59.5320, lng: 18.0339, heading: 210, altitude: 95 },
  { id: "JAR104", lat: 59.4450, lng: 17.8251, heading: 70, altitude: 105 },
  { id: "JAR105", lat: 59.4280, lng: 17.8663, heading: 330, altitude: 87 },
  { id: "JAR106", lat: 59.4125, lng: 17.8527, heading: 150, altitude: 113 },
  { id: "SOL001", lat: 59.4550, lng: 17.9380, heading: 130, altitude: 88 },
  { id: "SOL002", lat: 59.4672, lng: 17.9703, heading: 75, altitude: 140 },
  { id: "SOL003", lat: 59.4801, lng: 17.9549, heading: 310, altitude: 91 },
  { id: "JAR001", lat: 59.4200, lng: 17.8330, heading: 200, altitude: 110 },
  { id: "JAR002", lat: 59.4301, lng: 17.8550, heading: 20, altitude: 127 },
  { id: "JAR003", lat: 59.4395, lng: 17.8422, heading: 295, altitude: 97 },
  { id: "VAR001", lat: 59.3255, lng: 18.3920, heading: 90, altitude: 102 },   // Gustavsberg center
  { id: "VAR002", lat: 59.3321, lng: 18.4162, heading: 130, altitude: 94 },  // near Mörtnäs
  { id: "VAR003", lat: 59.3094, lng: 18.4077, heading: 270, altitude: 118 }, // Gustavsbergsbacken
  { id: "VAR004", lat: 59.3152, lng: 18.4491, heading: 60, altitude: 87 },   // Ösbyträsk
  { id: "VAR005", lat: 59.3041, lng: 18.4623, heading: 200, altitude: 130 }, // Hemmesta
  { id: "VAR006", lat: 59.2875, lng: 18.4744, heading: 310, altitude: 98 },  // towards Ingarö
  { id: "VAR007", lat: 59.2699, lng: 18.5075, heading: 15, altitude: 112 },  // central Ingarö
  { id: "VAR008", lat: 59.2523, lng: 18.5643, heading: 340, altitude: 91 },  // Fågelbro vicinity
  { id: "VAR009", lat: 59.2848, lng: 18.5941, heading: 80, altitude: 121 },  // east Ingarö
  { id: "VAR010", lat: 59.2999, lng: 18.6480, heading: 270, altitude: 105 },
  { id: "HUS001", lat: 59.4112, lng: 17.9320, heading: 120, altitude: 95 },  // Husby centrum
  { id: "HUS002", lat: 59.4095, lng: 17.9403, heading: 45, altitude: 110 },  // near Husbygårdsskolan
  { id: "HUS003", lat: 59.4083, lng: 17.9265, heading: 290, altitude: 88 },  // Järvafältet west
  { id: "HUS004", lat: 59.4141, lng: 17.9431, heading: 180, altitude: 104 }, // toward Kista
  { id: "HUS005", lat: 59.4169, lng: 17.9344, heading: 320, altitude: 99 },  // Akalla junction
  { id: "HUS006", lat: 59.4062, lng: 17.9369, heading: 230, altitude: 112 },

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

export function PopUpDrone() {
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
    
      {dummyDrones.map((drone) => {
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


