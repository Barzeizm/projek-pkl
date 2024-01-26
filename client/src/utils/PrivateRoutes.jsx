import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (isAuthenticated) {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // Split the token to access the roleId
    const decodedToken = token.split('.')[1];
    const roleId = JSON.parse(atob(decodedToken)).roleId;

    // Implement the rest of your code using the roleId
    if (roleId === 1 ){
      return <Outlet />;
    }
    
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoutes;

// import { Outlet, Navigate } from "react-router-dom";

// const PrivateRoutes = () => {
//     const isAuthenticated = !!localStorage.getItem("token");

//     if (isAuthenticated) {
//         // Retrieve the token from localStorage
//         const token = localStorage.getItem("token");

//         // Split the token to access the roleId
//         const decodedToken = token.split(".")[1];
//         const roleId = JSON.parse(atob(decodedToken)).roleId;

//         // Implement the rest of your code using the roleId

//         let props = {};

//         if (isAuthenticated && roleId === 1) {
//             props.roleId = 1;
//         } else if (isAuthenticated && roleId === 2) {
//             props.roleId = 2;
//         }

//         return <Outlet {...props} />;
//     } else {
//         return <Navigate to='/login' />;
//     }
// };

// export default PrivateRoutes;
