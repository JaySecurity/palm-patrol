import React from "react";
import "./Header.css";

function Header() {
  return (
    <div>
      <header className="header-logo">
        <img
          id="logo"
          alt="Logo"
          src="./../../images/binoculars.png"
          // style={{ width: "50%" }}
        ></img>
        | Palm Patrol
      </header>
    </div>
  );
}

export default Header;
