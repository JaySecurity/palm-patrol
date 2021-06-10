import React from "react";

function SignUp(props) {
  return (
    <div>
      SignUp
      <form autoComplete="off">
        <label>First Name:</label>
        <input type="text" name="firstName" required />
        <br />
        <label>Last Name:</label>
        <input type="text" name="lastName" required />
        <br />
        <label>Email:</label>
        <input type="email" name="email" required />
        <br />
        <label>Location:</label>
        <input type="text" name="lastName" required />
        <br />
      </form>
    </div>
  );
}

export default SignUp;
