import { useState, useEffect } from "react";

//--------- LEAFLET------------

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

//------------ UTILS ------
import DrawingModeControl from "@/mapScripts/drawingModeControl";
import ForbiddenZoneDrawing from "@/mapScripts/forbiddenZoneDrawing";
import { ZonesProvider } from "@/mapScripts/zonesContext";
import { InFlightProvider } from "./inFlightContext";
import LocationTracker from "@/mapScripts/locationTracker";


//--------------- Active Drones

import { ActiveDronesDisplayer} from "../ActiveDrones/activeDronesDisplayer";

//--------------- UI Components -----------
import { HamburgerButton } from "./layerHamburgerMenu";
import GPSToggleControl from "@/mapScripts/gpsToggleControl";
import { PopUpDrone } from "./popUpDrone";


/**MARKER ON MAP DEPLOYED VERSION*/

import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

//-------- Main Map Component -------
const Map = () => {
  const [trackingEnabled, setTrackingEnabled] = useState(true);
  const [drawingMode, setDrawingMode] = useState("path");
  const position = [59.3293, 18.0686]; // Stockholm coordinates
  const [showActiveDrones, setShowActiveDrones] = useState(true);
  

  const toggleTracking = () => {
    setTrackingEnabled((prev) => !prev);
  };

  /*
  console.log(droneManager.getInfoFromDrone(droneManager.allActiveDrones[0]));
  droneManager.updateArray();
  console.log(droneManager.getInfoFromDrone(droneManager.allActiveDrones[0]));*/





  ///
  return (
    //Overall map component generation with styling
    <div style={{ position: "relative", height: "82vh", width: "100%" }}>
      <MapContainer
        center={position}
        zoom={13}
        minZoom={5}
        maxZoom={18}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Initializing the leaflet-map*/}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Recenter to current position */}
        <GPSToggleControl/>

        {/* User tracking functionality*/}
        <LocationTracker trackingEnabled={trackingEnabled} />

        <ActiveDronesDisplayer/>

        <ZonesProvider>
          {/* This is the overlay HAMBURGER button */}
          <HamburgerButton position={position} trackingEnabled={trackingEnabled} setTrackingEnabled={setTrackingEnabled} showActiveDrones={showActiveDrones}
  setShowActiveDrones={setShowActiveDrones} />
          {/*<MapClick drawingMode={drawingMode} />*/}
          <ForbiddenZoneDrawing drawingMode={drawingMode} />
        </ZonesProvider>

          {showActiveDrones && <PopUpDrone />}
      </MapContainer>
    </div>
  );
};

export default Map;
