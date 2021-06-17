import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import { UserContext } from "../../context/UserContext";
import ReportList from "../../components/ReportList/ReportList";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: "#dd33fa",
    height: 35,
    width: 35,
    fontSize: "1rem",
    fontWeight: "bold",
  },
}));
function ProfilePage() {
  const [user, setUser] = useContext(UserContext);
  const [reports, setReports] = useState([]);
  const classes = useStyles();

  useEffect(async () => {
    try {
      let allReports = await axios.get(`/api/reports/user/${user._id}`);
      console.log(allReports.data);
      setReports(allReports.data);
    } catch (err) {}
  }, []);
  return (
    <div>
      <div className="avatar-user">
        <Avatar
          aria-label="recipe"
          className={classes.avatar}
          style={{ margin: "20px auto", transform: "scale(1.8)" }}
        >
          {user && `${user.firstName[0]}${user.lastName[0]}`}
        </Avatar>
      </div>
      <h1>Profile page</h1>
      <ProfileForm />
      <ReportList reports={reports} />
    </div>
  );
}

export default ProfilePage;
