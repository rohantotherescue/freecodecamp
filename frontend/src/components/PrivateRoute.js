import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
  const token = Cookies.get('jwtToken');

  return token ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
