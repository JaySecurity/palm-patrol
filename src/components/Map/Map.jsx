import { Icon } from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

function Leaflet(props) {
  const [address, setAddress] = useState('');
  const [markers, setMarkers] = useState([]);

  const mapRef = useRef(null);
  console.log(mapRef);
  const provider = new OpenStreetMapProvider({
    params: {
      email: 'jasonnicholls1981@gmail.com',
      'accept-language': 'en',
      countrycodes: 'ca',
    },
  });
  const theftPin = new Icon({
    iconUrl: '/images/red-pin.png',
    iconSize: [40, 50],
  });

  async function handleSearch() {
    let result = await provider.search({ query: address });
    result = result[0];
    console.log(result);
    const lat = result.y;
    const long = result.x;
    setMarkers([...markers, [lat, long]]);
  }

  const handleMove = () => {
    console.log('Move');
  };

  return (
    <div>
      <MapContainer
        center={[42.88652, -79.250854]}
        zoom={15}
        scrollWheelZoom={true}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {markers.map((marker) => {
          return (
            <Marker position={[...marker]} icon={theftPin}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <input
        type='text'
        name='address'
        onChange={(e) => setAddress(e.target.value)}
        value={address}
      />
      <button onClick={handleSearch}>Search Address </button>
    </div>
  );
}

export default Leaflet;
