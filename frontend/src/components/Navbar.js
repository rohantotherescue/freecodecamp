import React from 'react';
import { Link , useLocation } from 'react-router-dom';
import Logout from './Logout';
import '../App.css'; 

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">Home</Link>
      <div className="navbar-center">
        <img
          src="https://cdn.freecodecamp.org/platform/universal/fcc_primary.svg"
          alt="FreeCodeCamp Logo"
          className="navbar-logo"
        />
      </div>
      {location.pathname === '/courses' ? (
          <Logout />
      ) : (
        <div className="navbar-nav">
          <Link className="nav-link" to="/courses">Courses</Link>
          <Link className="nav-link" to="/sign-in">Sign In</Link>
          <Link className="nav-link" to="/register">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
