/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import EventList from '../../components/ReportList/ReportList';
import Leaflet from '../../components/Map/Map';
import axios from 'axios';
import './ReportsPage.css';

function ReportsPage() {
  const [bounds, setBounds] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [reports, setReports] = useState([]);
  const [, setUser] = useContext(UserContext);

  useEffect(async () => {
    let token = localStorage.getItem('token');
    if (token) {
      try {
        const res = await axios.post('/api/users/verify', { token });
        const validUser = res.data.decoded.user;
        setUser(validUser);
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

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
