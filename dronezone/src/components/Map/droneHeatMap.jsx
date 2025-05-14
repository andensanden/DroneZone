import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet.heat";

//  Komponent som visar en heatmap baserat på drönardata
export function DroneHeatMap({ droneData = [] }) {
  const map = useMap(); // Får referens till Leaflet-kartan

  useEffect(() => {
    // Konverterar drönardata till formatet [lat, lng, intensity]
    // Här används 0.6 som konstant intensitet för alla punkter
    const heatLayer = L.heatLayer(
      droneData.map((drone) => [drone.lat, drone.lng, 0.6]), // full intensity
      {
        radius: 70, // Radie på varje värmepunkt i pixlar
        blur: 25, // Mjukhet på övergångar
        maxZoom: 13, // Maximal zoom där heatmapen visas i full detalj
        gradient: {
          // Färger beroende på intensitet
          0.2: "blue",
          0.4: "lime",
          0.6: "orange",
          1.0: "red",
        },
      }
    ).addTo(map);

    // Städar bort lagret när komponenten avmonteras eller datan ändras
    return () => {
      map.removeLayer(heatLayer);
    };
  }, [droneData, map]); // Körs varje gång drönardata eller kartan ändras

  return null; // Komponent renderar inget synligt i DOM:en
}
