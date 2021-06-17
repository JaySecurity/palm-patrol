/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Leaflet from "../../components/Map/Map";
import ReportList from "../../components/ReportList/ReportList";
import { UserContext } from "../../context/UserContext";
import "./ReportsPage.css";

function ReportsPage() {
  const [bounds, setBounds] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [reports, setReports] = useState([]);
  const [, setUser] = useContext(UserContext);

  useEffect(async () => {
    let token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await axios.post("/api/users/verify", { token });
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
      let allReports = await axios.get("/api/reports/", {
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
    <div className="ReportsPage">
      <Leaflet setBounds={setBounds} markers={markers} />
      <ReportList reports={reports} />
    </div>
  );
}

export default ReportsPage;
