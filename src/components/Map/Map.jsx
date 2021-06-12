import { Icon } from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { useRef, useState } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

function Leaflet(props) {
  const [address, setAddress] = useState('');
  const [markers, setMarkers] = useState([]);

  const mapRef = useRef(null);
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

  // temporary test code
  async function handleSearch() {
    let result = await provider.search({ query: address });
    result = result[0];
    console.log(result);
    const lat = result.y;
    const long = result.x;
    setMarkers([...markers, [lat, long]]);
  }

  const handleMove = () => {
    const mapBounds = mapRef.current.leafletElement.getBounds();
    const bounds = {
      minLat: mapBounds._southWest.lat,
      minLong: mapBounds._southWest.lng,
      maxLat: mapBounds._northEast.lat,
      maxLong: mapBounds._northEast.lng,
    };
    props.setBounds({ ...bounds });
  };

  return (
    <Map
      center={[42.88652, -79.250854]}
      zoom={15}
      scrollWheelZoom={true}
      ref={mapRef}
      onmoveend={handleMove}
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
    </Map>
  );
}

export default Leaflet;
