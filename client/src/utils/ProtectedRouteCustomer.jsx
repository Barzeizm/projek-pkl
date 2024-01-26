import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteCustomer = () => {
    const isAuthenticated = localStorage.getItem("token");
    const roleId = isAuthenticated ? JSON.parse(atob(localStorage.getItem("token").split(".")[1])).roleId : null;

    if (isAuthenticated && roleId === 1) {
        return <Outlet />;
    } else if (!!isAuthenticated && roleId !== 2) {
        return <Navigate to='/agent/notfound' replace />;
    } else {
      return <Navigate to='/login' replace />;
    }
};

export default ProtectedRouteCustomer;