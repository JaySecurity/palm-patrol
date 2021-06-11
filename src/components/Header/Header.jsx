import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <header className="header-logo">
        <img
          id="logo"
          src="./../../images/binoculars.png"
          style={{ width: "7%" }}
        ></img>
        | Palm Patrol
      </header>
    </div>
  );
}

export default Header;
