/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Leaflet from '../../components/Map/Map';
import ReportList from '../../components/ReportList/ReportList';
import './ReportsPage.css';

function ReportsPage() {
  const [bounds, setBounds] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(async () => {
    try {
      let allReports = await axios.get('/api/reports/', {
        params: { ...bounds },
      });
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
      <ReportList reports={reports} />
    </div>
  );
}

export default ReportsPage;
