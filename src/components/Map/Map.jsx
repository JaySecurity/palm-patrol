import { Icon } from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

function Leaflet({ setBounds, markers }) {
  const mapRef = useRef(null);
  const [center, setCenter] = useState([]);
  const theftPin = new Icon({
    iconUrl: '/images/red-pin.png',
    iconSize: [40, 50],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoords);
    }
    handleMove();
  }, []);

  const getCoords = (position) => {
    setCenter([position.coords.latitude, position.coords.longitude]);
  };

  const handleMove = () => {
    const mapBounds = mapRef.current.leafletElement.getBounds();
    const bounds = {
      minLat: mapBounds._southWest.lat,
      minLong: mapBounds._southWest.lng,
      maxLat: mapBounds._northEast.lat,
      maxLong: mapBounds._northEast.lng,
    };
    setBounds({ ...bounds });
  };

  return (
    <Map
      center={center[0] ? center : [42.88652, -79.250854]}
      zoom={15}
      scrollWheelZoom={true}
      ref={mapRef}
      onmoveend={handleMove}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {markers.map((marker, i) => {
        return (
          <Marker
            key={i}
            position={[marker.location.lat, marker.location.long]}
            icon={theftPin}
          >
            <Popup>
              <h3>{marker.title}</h3>
              <h4>{marker.category}</h4>
            </Popup>
          </Marker>
        );
      })}
    </Map>
  );
}

export default Leaflet;
