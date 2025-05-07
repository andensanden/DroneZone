import { useState } from "react";
import { Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import droneIconUrl from "@/assets/icon.svg";
import { SelectedDronePanel } from "./selectedDronePanel";
import { useMap } from "react-leaflet";

const map = useMap();
const zoom = map.getZoom();

const droneIcon = new L.Icon({
  iconUrl: droneIconUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const dummyDrones = [
  { id: "ABC123", lat: 59.3999, lng: 18.0000, heading: 45 },
  { id: "XYZ456", lat: 59.3287, lng: 18.0712, heading: 135 },
];

export function PopUpDrone() {
  const [selectedDrone, setSelectedDrone] = useState(null);

  return (
    <>
      {dummyDrones.map((drone) => {
        const position = [drone.lat, drone.lng];
        const headingEnd = [
          drone.lat + 0.0005 * Math.sin((drone.heading * Math.PI) / 180),
          drone.lng + 0.0005 * Math.cos((drone.heading * Math.PI) / 180),
        ];

        const labelIcon = L.divIcon({
          className: "drone-label-icon",
          html: `
            <div style="
              background: white;
              border: 3px solid #555;
              border-radius: 8px;
              padding: 6px 16px;
              min-width: 130px; 
              font-family: monospace;
              font-weight: bold;
              font-size: 14px;
              position: relative;
              color: black;
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
              opacity={0.5}
              eventHandlers={{ click: () => setSelectedDrone(drone) }}
            />
            <Marker position={[drone.lat + 0.0003, drone.lng + 0.0002]} icon={labelIcon} interactive={false} />
            <Polyline positions={[position, headingEnd]} color="gray" weight={2} />
          </div>
        );
      })}

      <SelectedDronePanel drone={selectedDrone} onClose={() => setSelectedDrone(null)} />
    </>
  );
}


