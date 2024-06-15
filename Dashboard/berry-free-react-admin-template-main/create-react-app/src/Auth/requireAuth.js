import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const RequireAuth = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');

  return (
    <Route
      {...rest}
      element={token ? <Component /> : <Navigate to="/login" replace />}
    />
  );
};

export default RequireAuth;
