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
        <footer class='flex-foot-text'>
          <p id='txt-1'>Home</p>
          <div id='txt-2'>Logout</div>
          <div id='txt-3'>Events</div>
          <div id='txt-4'>New Event</div>
        </footer>
        <footer class='flex-foot'>
          <p id='i-1'>
            <Link to='./EventList'>
              <HomeIcon />
            </Link>
          </p>
          <p id='i-2'>
            <Link to='./SignUp'>
              <ExitToAppIcon />{' '}
            </Link>
          </p>
          <p id='i-3'>
            <Link to='/reports'>
              <ViewListIcon />{' '}
            </Link>
          </p>
          <p id='i-4'>
            <Link to='./AddEvent'>
              <AddAlarmIcon />{' '}
            </Link>
          </p>
        </footer>
      </nav>
    </div>
  );
}

export default Nav;
