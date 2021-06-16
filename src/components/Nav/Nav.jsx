import AddAlarmIcon from '@material-ui/icons/AddAlarm';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext.js';
import './Nav.css';
function Nav() {
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <div>
      <nav>
        <footer className='flex-foot'>
          <div id='i-1'>
            <Link to='/'>
              <HomeIcon />
              <p>Home</p>
            </Link>
          </div>
          <div id='i-2'>
            {!user?._id ? (
              <Link to='/login'>
                <ExitToAppIcon />
                <p>Login</p>
              </Link>
            ) : (
              <button className='logout-btn' onClick={handleLogout}>
                <ExitToAppIcon />
                <p>Logout</p>
              </button>
            )}
          </div>
          <div id='i-3'>
            <Link to='/profile'>
              <AccountCircleIcon /> <p>Profile</p>
            </Link>
          </div>
          <div id='i-4'>
            <Link to='/report/category'>
              <AddAlarmIcon /> <p>New Report</p>
            </Link>
          </div>
        </footer>
      </nav>
    </div>
  );
}

export default Nav;
