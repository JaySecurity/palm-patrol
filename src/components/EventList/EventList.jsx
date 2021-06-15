import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventListItem from "../EventListItem/EventListItem";
function EventList({ reports }) {
  return (
    <div>
      <h1>Recent Reports</h1>
      {reports.map((report) => (
        <Link key={report._id} to={`/report/${report._id}`}>
          <EventListItem report={report} />
        </Link>
      ))}
    </div>
  );
}

export default EventList;
