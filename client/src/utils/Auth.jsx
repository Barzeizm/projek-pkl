import React from "react";
import { Navigate } from "react-router-dom";

const withAuthorization = (WrappedComponent, allowedRoles) => {
    const AuthorizationWrapper = (props) => {
        // Check if the user's role is allowed
        const token = localStorage.getItem("token");
        let userRole = null;

        if (token) {
            const tokenParts = token.split(".");
            if (tokenParts.length === 3) {
                const payload = JSON.parse(atob(tokenParts[1]));
                userRole = payload.roleId;
            }
        }

        if (!allowedRoles.includes(userRole)) {
            // Redirect to unauthorized page if not allowed
            return <Navigate to="/unauthorized" />;
        }

        // Render the wrapped component if allowed
        return <WrappedComponent {...props} />;
    };

    return AuthorizationWrapper;
};

export default withAuthorization;