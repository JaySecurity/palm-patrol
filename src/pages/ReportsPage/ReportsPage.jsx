import React, { useState, useEffect } from 'react';
import EventList from '../../components/EventList/EventList';
import Leaflet from '../../components/Map/Map';
import axios from 'axios';
import './ReportsPage.css';

function ReportsPage() {
  const [bounds, setBounds] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [reports, setReports] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      let allReports = await axios.get('/api/reports/');
      setReports([...allReports.data]);
    } catch (err) {}
  }, [bounds]);

  useEffect(() => {
    let markerArr = reports.map((report) => ({
      location: report.location,
      title: report.title,
      category: report.category,
    }));
    setMarkers(markerArr);
  }, [reports]);

  return (
    <div className='ReportsPage'>
      <Leaflet setBounds={setBounds} markers={markers} />
      <EventList reports={reports} />
    </div>
  );
}

export default ReportsPage;
