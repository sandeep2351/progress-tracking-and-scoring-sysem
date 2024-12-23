import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminPanel = () => {
  const [taskList, setTaskList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    candidateName: "",
  });
  const [progressDetails, setProgressDetails] = useState({
    progress: 0,
    projectId: "",
  });

  const navigate = useNavigate();

  // Helper function to get the JWT token from localStorage
  const getAuthToken = () => localStorage.getItem("token");

  // Load registered users
  const loadUsers = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error("No token found");
        navigate("/login");
        return;
      }

      const response = await axios.get("http://localhost:5005/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserList(response.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  // Load tasks
  const loadTasks = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error("No token found");
        navigate("/login");
        return;
      }

      const response = await axios.get("http://localhost:5005/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTaskList(response.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    loadTasks();
    loadUsers();
  }, []);

  // Assign a new task
  const assignTask = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        navigate("/login");
        return;
      }

      await axios.post(
        "http://localhost:5005/api/projects",
        taskDetails,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTaskDetails({ title: "", description: "", candidateName: "" });
      loadTasks();
    } catch (err) {
      console.error("Error while assigning task:", err);
    }
  };

  // Update task progress
  const updateProgress = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        navigate("/login");
        return;
      }

      await axios.put(
        `http://localhost:5005/api/projects/${progressDetails.projectId}/progress`,
        { progress: progressDetails.progress },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProgressDetails({ progress: 0, projectId: "" });
      loadTasks();
    } catch (err) {
      console.error("Error while updating progress:", err);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container">
      <button onClick={handleLogout} className="logout-btn">Logout</button>
      <h1>Admin Panel</h1>

      <div className="assign-project">
        <h2>Assign New Project</h2>
        <input
          type="text"
          placeholder="Project Title"
          value={taskDetails.title}
          onChange={(e) => setTaskDetails({ ...taskDetails, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Project Description"
          value={taskDetails.description}
          onChange={(e) => setTaskDetails({ ...taskDetails, description: e.target.value })}
        />
        <select
          value={taskDetails.candidateName}
          onChange={(e) => setTaskDetails({ ...taskDetails, candidateName: e.target.value })}
        >
          <option value="">Choose a Candidate</option>
          {userList.map((user) => (
            <option key={user._id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
        <button onClick={assignTask}>Assign Project</button>
      </div>

      <div className="projects">
        <h2>Projects Overview</h2>
        {taskList.map((task) => (
          <div className="project-card" key={task._id}>
            <h3>{task.title} (Assigned to: {task.candidateName})</h3>
            <p>Description: {task.description}</p>
            <p>Progress: {task.progress}%</p>
            <input
              type="number"
              placeholder="Update Progress"
              value={progressDetails.progress}
              onChange={(e) =>
                setProgressDetails({ ...progressDetails, progress: e.target.value, projectId: task._id })
              }
            />
            <button onClick={updateProgress}>Update Progress</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
