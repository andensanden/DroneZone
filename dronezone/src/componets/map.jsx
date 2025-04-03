import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MapClick from '@/mapScripts/pathDrawing';

/*
  Locate the users location and place a marker at location upon start of program
*/
function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMap()
  useEffect(() => {
    map.locate()
    map.on('locationfound', (e) => {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    })
  }, [map])

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

const Map = () => {
  const position = [59.3293, 18.0686]; // Coordinates for the map's center 

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker/>
      <MapClick/>
    </MapContainer>
  );
};

export default Map;