// src/components/Navbar.js
import React from 'react';
import { Link , useLocation } from 'react-router-dom';
import Logout from './Logout';

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Home</Link>
              {/* <Link className="nav-link" to="/courses">Courses</Link>
              <Link className="nav-link" to="/sign-in">Sign In</Link>
              <Link className="nav-link" to="/register">Register</Link>
              <Logout /> */}
          {location.pathname === '/courses' ? (
                <Logout />
            ) : (
              <>
                  <Link className="nav-link" to="/">Home</Link>
                  <Link className="nav-link" to="/courses">Courses</Link>
                  <Link className="nav-link" to="/sign-in">Sign In</Link>
                  <Link className="nav-link" to="/register">Register</Link>
              </>
            )}
      </div>
    </nav>
  );
};

export default Navbar;
