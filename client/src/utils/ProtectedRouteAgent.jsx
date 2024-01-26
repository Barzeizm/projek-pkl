import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteAgent = () => {
  const isAuthenticated = localStorage.getItem("token");
  const roleId = isAuthenticated ? JSON.parse(atob(localStorage.getItem("token").split(".")[1])).roleId : null;

  if (isAuthenticated && roleId === 2) {
      return <Outlet />;
  } else if (roleId !== 2) {
      return <Navigate to='/customer/notfound' replace />;
  } else {
      return <Navigate to='/login' replace />;
  } 
};

export default ProtectedRouteAgent;