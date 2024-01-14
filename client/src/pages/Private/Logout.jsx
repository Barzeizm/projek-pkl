import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Redirect to the home page after logout
    navigate('/');
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
