import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventListItem from "../EventListItem/EventListItem";
function EventList(props) {
  const [reports, setReports] = useState([
    {
      title: "car accident",
      incidentData: "September 14, 2016",
      // category: "accident",
      description:
        "car accident on Ambleside street Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo quis totam, voluptate ipsa eligendi aperiam voluptates facere! Architecto veniam illum adipisci nobis fuga corporis ut.",
    },
    {
      title: "train accident",
      incidentData: "September 12, 2016",
      // category: "accident",
      description:
        "car accident on Ambleside street Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo quis totam, voluptate ipsa eligendi aperiam voluptates facere! Architecto veniam illum adipisci nobis fuga corporis ut.",
    },
  ]);

  useEffect(() => {
    console.log("Update List");
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
