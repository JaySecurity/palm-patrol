import AddAlarmIcon from '@material-ui/icons/AddAlarm';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import ViewListIcon from '@material-ui/icons/ViewList';
import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
function Nav() {
  return (
    <div>
      <nav>
        <footer class='flex-foot'>
          <p id='i-1'>
            <Link to='./EventList'>
              <HomeIcon />
              <p>Home</p>
            </Link>
          </p>
          <p id='i-2'>
            <Link to='./SignUp'>
              <ExitToAppIcon /> <p>Logout</p>
            </Link>
          </p>
          <p id='i-3'>
            <Link to='/reports'>
              <ViewListIcon /> <p>Events</p>
            </Link>
          </p>
          <p id='i-4'>
            <Link to='./AddEvent'>
              <AddAlarmIcon /> <p>New Event</p>
            </Link>
          </p>
        </footer>
      </nav>
    </div>
  );
}

export default Nav;
