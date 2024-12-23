import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css'; // Import your custom CSS styles

const AdminLogin = ({ setIsAuthenticated, setUserRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission for admin login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend for login
      const response = await axios.post('http://localhost:5005/api/auth/login', {
        email,
        password,
      });

      // Log the response to see the token, name, and isAdmin status
      console.log("Login Response:", response.data);

      // Check if user is an admin
      if (response.data.isAdmin) {
        // Store token and user details in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('adminName', response.data.name);

        // Update authentication state
        setIsAuthenticated(true);
        setUserRole('admin');

        // Redirect to Admin Dashboard
        navigate('/admin');
      } else {
        setError('You are not authorized to access the admin dashboard.');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <h2>Admin Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
