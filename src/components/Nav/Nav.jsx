import AddAlarmIcon from "@material-ui/icons/AddAlarm";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import ViewListIcon from "@material-ui/icons/ViewList";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext.js";
import "./Nav.css";
function Nav() {
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <div>
      <nav>
        <footer className="flex-foot">
          <p id="i-1">
            <Link to="/">
              <HomeIcon />
              <p>Home</p>
            </Link>
          </p>
          <p id="i-2">
            {!user?._id ? (
              <Link to="/login">
                <ExitToAppIcon />
                <p>Login</p>
              </Link>
            ) : (
              <button className="logout-btn" onClick={handleLogout}>
                <ExitToAppIcon />
                <p>Logout</p>
              </button>
            )}
          </p>
          <p id="i-3">
            <Link to="/reports">
              <ViewListIcon /> <p>Events</p>
            </Link>
          </p>
          <p id="i-4">
            <Link to="./AddEvent">
              <AddAlarmIcon /> <p>New Event</p>
            </Link>
          </p>
        </footer>
      </nav>
    </div>
  );
}

export default Nav;
