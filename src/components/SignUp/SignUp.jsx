import React from "react";
import "./SignUp.css";
function SignUp() {
  return (
    <div>
      SignUp
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
            <label>
              Email:
              <input id="input" type="email" name="email" required />
            </label>
          </div>
          <div className="form-row">
            <label>Location:</label>
            <input id="input" type="text" name="lastName" required />
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
