/* eslint-disable no-unused-vars */
import styles from "./Map.module.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useEffect, useState } from "react";
import { useCities } from "../../contexts/CitiesContext";
import Button from "../Button/Button";
import { useUrlLocation } from "../../hooks/useUrlLocation";

function Map() {
  const { cities } = useCities();

  const [mapPostion, setMapPosition] = useState([48, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  // will return the lat and lng from url
  const [mapLat, mapLng] = useUrlLocation();
  // sync current position with with map position
  // to keep marker on the same position when back to the list of city
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  // it will sync the position of the map that we clicked
  // and will return new position
  useEffect(
    function () {
      if (geoLocationPosition)
        // setMapPosition([45, 0]);
        setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    },
    [geoLocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position..!"}
        </Button>
      )}
      <MapContainer
        center={mapPostion}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span> {city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPostion} />
        <DetectClick />
      </MapContainer>
      ,
    </div>
  );
}
// eslint-disable-next-line react/prop-types
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

// by clciking on the map it will open the form
function DetectClick() {
  // this hoock will use to navigate from a point to specific Form
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
