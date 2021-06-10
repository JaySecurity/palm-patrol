import React from "react";

function Login(props) {
  return (
    <div>
      Login
      <form autoComplete="off">
        <label>Email:</label>
        <input type="email" name="email" required />
        <br />
        <label>Password:</label>
        <input type="text" name="password" required />
        <br />
      </form>
    </div>
  );
}

export default Login;
