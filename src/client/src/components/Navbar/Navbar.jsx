import "./Navbar.css";

import { Link } from "react-router-dom";
import React from "react";

const Navbar = () => {
  return (
    <nav>
      Header
      <div className="nav-button-cont">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
