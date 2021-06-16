import React from 'react';
import { Link } from 'react-router-dom';
import ReportListItem from '../ReportListItem/ReportListItem';
function ReportList({ reports }) {
  return (
    <div>
      <h1>Recent Reports</h1>
      {reports.map((report) => (
        <Link key={report._id} to={`/report/${report._id}`}>
          <ReportListItem report={report} />
        </Link>
      ))}
    </div>
  );
}

export default ReportList;
