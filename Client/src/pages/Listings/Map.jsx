import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

function Map({ spots, location, setHoveredIndex, hoveredIndex }) {
  return (
      <MapContainer
        center={location}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location && <Marker icon={userIcon} position={location} />}
        {spots &&
          spots.map((spot, index) => {
            return (
              <CustomMarker
                position={[spot.location.lat, spot.location.lon]}
                key={spot._id}
                index={index}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                _id={spot._id}
              />
            );
          })}
        <RecenterAutomatically location={location} />
      </MapContainer>
  );
}

const RecenterAutomatically = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(location);
  }, location);
  return null;
};

const customIcon = L.icon({
  iconUrl: "/map-marker.png",
  iconSize: [36, 36],
  iconAnchor: [18, 30], // Anchor point of the icon (center-bottom)
});

const hoverIcon = L.icon({
  iconUrl: "/map-marker.png",
  iconSize: [42, 42],
  iconAnchor: [21, 36], // Anchor point of the icon (center-bottom)
});

const userIcon = L.icon({
  iconUrl: "/user-marker.png",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

const CustomMarker = ({ position, index, hoveredIndex, setHoveredIndex, _id }) => {
  const navigate = useNavigate();
  function redirectToSpot(){
    navigate(`/listing/${_id}`)
  }

  return (
    <Marker
      position={position}
      icon={index == hoveredIndex ? hoverIcon : customIcon}
      eventHandlers={{
        mouseover: () => setHoveredIndex(index),
        mouseout: () => setHoveredIndex(null),
        click: redirectToSpot,
      }}
    />
  );
};

export default Map;
