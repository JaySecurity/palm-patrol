/* eslint-disable react-hooks/exhaustive-deps */
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import ReportList from '../../components/ReportList/ReportList';
import { UserContext } from '../../context/UserContext';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: '#dd33fa',
    height: 35,
    width: 35,
    fontSize: '1rem',
    fontWeight: 'bold',
  },
}));
function ProfilePage() {
  const [user, setUser] = useContext(UserContext);
  const [reports, setReports] = useState([]);
  const classes = useStyles();

  useEffect(async () => {
    try {
      let allReports = await axios.get(`/api/reports/user/${user._id}`);
      setReports(allReports.data);
    } catch (err) {}
  }, [user]);
  return (
    <div>
      {user ? (
        <>
          <div className='avatar-user'>
            <Avatar
              aria-label='recipe'
              className={classes.avatar}
              style={{ margin: '20px auto', transform: 'scale(1.8)' }}
            >
              {user && `${user.firstName[0]}${user.lastName[0]}`}
            </Avatar>
          </div>
          <h1>Profile page</h1>
          <ProfileForm />
          <ReportList reports={reports} />
        </>
      ) : null}
    </div>
  );
}

export default ProfilePage;
