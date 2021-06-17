import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { ExitToApp } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./ProfileForm.css";

function ProfileForm() {
  const [msg, setMsg] = useState(null);
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      let res = await axios.post("/api/users/signup", {
        // firstName,
        // lastName,
        // email,
        // password,
        // confirm,
      });
      let token = `Bearer ${res.data}`;
      localStorage.setItem("token", token);
      history.push("/");
    } catch (e) {
      setUser(null);
      let {
        response: {
          data: { msg },
        },
      } = e;
      setMsg(msg);
    }
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  return (
    <div className="update">
      {msg && <Alert severity="error">{msg}</Alert>}
      <form className="SignUp-form" onSubmit={handleSubmit}>
        <TextField
          className="form-group"
          required
          type="text"
          id="firstName"
          name="firstName"
          value={user.firstName}
          label="First Name"
          onChange={handleChange}
        />
        <TextField
          className="form-group"
          required
          type="text"
          id="lastName"
          name="lastName"
          value={user.lastName}
          label="Last Name"
          onChange={handleChange}
        />
        <TextField
          className="form-group"
          required
          type="email"
          id="email"
          name="email"
          value={user.email}
          label="Email"
          onChange={handleChange}
        />

        {/* <Button
          variant="contained"
          color="primary"
          size="small"
          endIcon={<ExitToApp />}
          onClick={handleSubmit}
        >
          update
        </Button> */}
      </form>
    </div>
  );
}

export default ProfileForm;
