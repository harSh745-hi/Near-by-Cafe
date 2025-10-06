import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Default marker fix for Leaflet in React
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


// Helper component to recenter map
function RecenterMap({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) map.setView([lat, lng], 15);
  }, [lat, lng, map]);
  return null;
}

const MapView = ({ userLocation, cafes, selectedCafe }) => {
  const defaultPosition = [18.5018, 73.8636]; // Default : pune - swargate  

  return (
    <div className="map-container">
      <MapContainer
        center={userLocation ? [userLocation.lat, userLocation.lng] : defaultPosition}
        zoom={14}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup> You are here</Popup>
          </Marker>
        )}

        {cafes.map((cafe, index) => (
          <Marker key={index} position={[cafe.lat, cafe.lng]}>
            <Popup> {cafe.name}</Popup>
          </Marker>
        ))}

        {selectedCafe && (
          <RecenterMap lat={selectedCafe.lat} lng={selectedCafe.lng} />
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;
