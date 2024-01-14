import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  // Check the actual authentication status, you might want to fetch it from localStorage or any authentication context
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;