import React from "react";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ element: Component, role, ...rest }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect the user to the login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  const tokenParts = token.split(".");
  if (tokenParts.length !== 3) {
    // Invalid token format, redirect to login
    return <Navigate to="/login" replace />;
  }

  const payload = JSON.parse(atob(tokenParts[1]));
  const roleId = payload.roleId;

  if (roleId === role) {
    // Render the component if the user has the required role
    return <Route element={<Component />} {...rest} />;
  } else {
    // Redirect to unauthorized page or show an error message
    return <Navigate to="/unauthorized" replace />;
  }
};

export default ProtectedRoute;