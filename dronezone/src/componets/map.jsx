import { MapContainer, TileLayer, Marker, Popup, LayersControl, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
//Gelocation api för start coords ~~~

const Map = () => {
  const position = [51.505, -0.09]; // Coordinates for the map's center

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/*This is the overlay HAMBURGER button */}
      <LayersControl position="topright">
      <LayersControl.Overlay name="Display Current Location">
        <Marker position={position}>
          <Popup>
            Current Location <br />
          </Popup>
        </Marker>
      </LayersControl.Overlay>
        <LayersControl.Overlay name="Display Current Restricted Areas">
        {/*Generate places with restricted flight zones */}
        <Circle position={position} radius={200}/>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Show Active Drones">
        {/*Generate locations of active drones*/}
        <Circle position={position} radius={200}/>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

export default Map;
