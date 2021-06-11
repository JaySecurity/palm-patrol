import React, { useEffect, useState } from 'react';
function EventList(props) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log('Update List');
    // call to api for all events in the bounds of the map
  }, [props.bounds]);

  return (
    <div>
      <h1>Recent Reports</h1>
    </div>
  );
}

export default EventList;
