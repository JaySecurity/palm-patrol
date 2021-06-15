import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventListItem from '../EventListItem/EventListItem';
function EventList(props) {
  const [reports, setReports] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      let allReports = await axios.get('/api/reports/');
      console.log(allReports.data);
      setReports([...allReports.data]);
    } catch (err) {}
  }, [props.bounds]);

  const deleteReport = () => {
    alert("deleted button clicked");
  };

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
