import React from "react";
import "./SignUp.css";
function SignUp() {
  return (
    <div>
      <div className="signup-title">SignUp</div>
      <form autoComplete="off">
        <div className="signup-form">
          <div className="form-row">
            <label>First Name:</label>
            <input id="input" type="text" name="firstName" required />
          </div>

          <div className="form-row">
            <label>Last Name:</label>
            <input id="input" type="text" name="lastName" required />
          </div>
          <div className="form-row">
            <label>Email: </label>
            <input id="input" type="email" name="email" required />
          </div>
          <div className="form-row">
            <label>Password:</label>
            <input id="input" type="text" name="password" required />
          </div>
          <div className="form-row">
            <label>Confirm password:</label>
            <input id="input" type="text" name="confirm" required />
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
