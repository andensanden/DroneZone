import { useMapEvents } from 'react-leaflet';

const FlightPathDrawer = ({ setFlightPath }) => {
  useMapEvents({
    click:(e) => {
      setFlightPath(prev => [...prev, [e.latlng.lat, e.latlng.lng]]);
    }
  });

  return null;
};

export default FlightPathDrawer;
