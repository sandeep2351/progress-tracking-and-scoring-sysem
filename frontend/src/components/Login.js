import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = ({ setIsAuthenticated, setUserRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
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

      // Check if login is successful, and handle redirection based on user role
      if (response.data.token) {
        // Save token, name, and isAdmin status in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('candidateName', response.data.name);
        localStorage.setItem('isAdmin', response.data.isAdmin); // Save isAdmin field

        // Set the authentication and user role in state
        setIsAuthenticated(true);
        setUserRole(response.data.isAdmin ? 'admin' : 'candidate');

        // Redirect based on isAdmin
        if (response.data.isAdmin) {
          navigate('/admin'); // Redirect to admin dashboard
        } else {
          navigate('/candidate'); // Redirect to candidate dashboard
        }
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError('There was an issue with your login. Please try again later.');
    }
  };

  return (
    <div className="page-container">
      <div className="login-container">
        <h2>{localStorage.getItem('isAdmin') === 'true' ? 'Admin Login' : 'Candidate Login'}</h2> {/* Dynamic title */}
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

        <div className="register-prompt">
          <p>New to the platform? <span onClick={() => navigate('/register')} className="register-link">Register here</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
