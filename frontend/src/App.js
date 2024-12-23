import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import CandidateDashboard from './components/CandidateDashboard';
import AdminDashboard from './components/AdminDashboard';
import HomePage from './components/HomePage';
import PrivateRoute from './components/PrivateRoute';
import AdminLogin from './components/AdminLogin';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("isAdmin");
    if (token) {
      setIsAuthenticated(true);
      setUserRole(role === 'true' ? 'admin' : 'candidate');
    }
  }, []);

  return (
    <Router>  {/* Make sure Router is wrapping the entire app */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
        <Route path="/adminlogin" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />

        {/* Protect routes based on user authentication */}
        <Route
          path="/candidate"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole}>
              <CandidateDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} userRole={userRole}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
