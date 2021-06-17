import Avatar from "@material-ui/core/Avatar";
import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./ReportCategories.css";

export default function ReportCategories() {
  const [user] = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!user) history.push("/login");
  });

  return (
    <div className="category">
      <div className="first-row">
        <div className="item">
          <Link to={{ pathname: "/report/add", category: "Accident" }}>
            <Avatar alt="accident" src="/images/car.png" />
            Accident
          </Link>
        </div>
        <div className="item">
          <Link to={{ pathname: "/report/add", category: "Theft" }}>
            <Avatar alt="Theft" src="/images/Theft_2.png" />
            Theft
          </Link>
        </div>
        <div className="item">
          <Link to={{ pathname: "/report/add", category: "Lost&Found" }}>
            <Avatar alt="Lost&Found" src="/images/open_safety_box.png" />
            Lost&Found
          </Link>
        </div>
      </div>
      <div className="second-row">
        <div className="item">
          <Link to={{ pathname: "/report/add", category: "Vandalism" }}>
            <Avatar alt="Travis Howard" src="/images/broken_link.png" />
            Vandalism
          </Link>
        </div>
        <div className="item">
          <Link to={{ pathname: "/report/add", category: "Other" }}>
            <Avatar alt="Other" src="/images/risk_assesment.png" />
            Other
          </Link>
        </div>
      </div>
    </div>
  );
}
