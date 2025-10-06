import { useEffect, useState } from "react";
import MapView from "./MapView";
import CafeList from "./CafeList";
import "./index.css";

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [cafes, setCafes] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState(null);

  // Fetch user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => alert("Please allow location access.")
    );
  }, []);

  // Fetch cafes from JSON
  useEffect(() => {
    fetch("/cafes.json")
      .then((res) => res.json())
      .then((data) => setCafes(data))
      .catch((err) => console.error("Error loading cafes:", err));
  }, []);

  return (
    <div className="app-container">
      <CafeList cafes={cafes} onSelect={setSelectedCafe} />
      <MapView
        userLocation={userLocation}
        cafes={cafes}
        selectedCafe={selectedCafe}
      />
    </div>
  );
}

export default App;
