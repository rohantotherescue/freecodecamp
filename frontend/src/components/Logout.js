import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the jwtToken cookie
    Cookies.remove('jwtToken');
    navigate('/sign-in');
  };

  return (
    <button onClick={handleLogout} className="logout-btn" >
      Logout
    </button>
  );
};

export default Logout;
