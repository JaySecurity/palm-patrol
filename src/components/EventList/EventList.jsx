import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventListItem from '../EventListItem/EventListItem';
function EventList(props) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    console.log('Update List');
    // call to api for all events in the bounds of the map
  }, [props.bounds]);

  return (
    <div>
      <h1>Recent Reports</h1>
      {reports.map((report) => (
        <Link to={`/report/${report._id}`}>
          <EventListItem report={report} />
        </Link>
      ))}
    </div>
  );
}

export default EventList;
