import { Icon } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const theftPin = new Icon({
  iconUrl: '/images/red-pin.png',
  iconSize: [40, 50],
});

const Leaflet = (props) => {
  return (
    <div>
      <MapContainer
        center={[42.88652, -79.250854]}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={[42.88652, -79.250854]} icon={theftPin}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Leaflet;
