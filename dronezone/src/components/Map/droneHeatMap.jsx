import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet.heat";

export function DroneHeatMap({ droneData = [] }) {
    const map = useMap();
  
    useEffect(() => {
      const heatLayer = L.heatLayer(
        droneData.map((drone) => [drone.lat, drone.lng, 0.6]), // full intensity
        {
          radius: 70,
          blur: 25,
          maxZoom: 13,
          gradient: {
            0.2: "blue",
            0.4: "lime",
            0.6: "orange",
            1.0: "red",
          },
        }
      ).addTo(map);
  
      return () => {
        map.removeLayer(heatLayer);
      };
    }, [droneData, map]);
  
    return null;
  }
  