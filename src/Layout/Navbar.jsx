import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../db/firebase";
import AuthUser from "../Classes/AuthUser";
import { observer } from "mobx-react";
import { useIsUser } from "../Hooks/useIsUser";

const Navbar = observer(() => {
  const isUser = useIsUser();
  const logout = () => {
    signOut(auth);
    AuthUser.setUserAuth(false);
  };

  return (
    <nav className="Navbar" id="NavbarId">
      <div className="Page-name">
        <h2>Crypto Notes</h2>
      </div>
      <div className="Container">
        <Link to="/">
          <h1 className="item">Home</h1>
        </Link>
        {isUser && (
          <Link to="/Add">
            <h1 className="item">Add</h1>
          </Link>
        )}
        {!isUser && (
          <>
            <Link to="/Register">
              <h1 className="item">Register</h1>
            </Link>
            <Link to="/Login">
              <h1 className="item">Login</h1>
            </Link>
          </>
        )}
        {isUser && (
          <Link to="/" onClick={logout} className="Logout">
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
});

export default Navbar;
