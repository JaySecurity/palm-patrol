import React, { useState } from 'react';
import EventList from '../../components/EventList/EventList';
import Leaflet from '../../components/Map/Map';

function ReportsPage() {
  const [bounds, setBounds] = useState([]);

  return (
    <div>
      <Leaflet setBounds={setBounds} />
      <EventList bounds={bounds} />
    </div>
  );
}

export default ReportsPage;
