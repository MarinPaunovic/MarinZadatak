import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="Navbar" id="NavbarId">
      <div className="Page-name">
        <h2>Crypto Notes</h2>
      </div>
      <div className="Container">
        <Link to="/">
          <h1 className="item">Home</h1>
        </Link>
        <Link to="/Add">
          <h1 className="item">Add</h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
