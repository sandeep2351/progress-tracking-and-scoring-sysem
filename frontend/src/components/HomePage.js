import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();  // Using useNavigate hook for navigation

  const handleAdminLoginClick = () => {
    navigate('/adminlogin');  // Navigate to admin login page
  };

  const handleEmployeeLoginClick = () => {
    navigate('/login');  // Navigate to employee login page
  };

  return (
    <div className="home-container">
      <div className="intro-text">
        <h1>Welcome to the Dashboard</h1>
        <p>Please choose your login option</p>
      </div>

      <div className="login-box-container">
        <div className="login-box admin" onClick={handleAdminLoginClick}>
          <h2>Admin Login</h2>
          <p>Access the administrative panel</p>
        </div>

        <div className="login-box employee" onClick={handleEmployeeLoginClick}>
          <h2>User Login</h2>
          <p>Access your employee dashboard</p>
        </div>
      </div>

      <footer>
        <p>&copy; 2024 Ionots | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default HomePage;
