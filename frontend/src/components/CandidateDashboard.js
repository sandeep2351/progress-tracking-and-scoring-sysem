import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const CandidateDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [candidateName, setCandidateName] = useState(
    localStorage.getItem("candidateName")
  );
  const [progress, setProgress] = useState({});
  const navigate = useNavigate(); // Initialize the navigate function

  // Fetch projects assigned to the candidate
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5005/api/projects/candidate/${candidateName}`
        );
        console.log("Projects fetched:", response.data); // Debugging line
        setProjects(response.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    if (candidateName) {
      fetchProjects();
    }
  }, [candidateName]);

  // Handle progress update
  const handleProgressUpdate = async (projectId) => {
    const newProgress = progress[projectId] || 0;

    try {
      const response = await axios.put(
        `http://localhost:5005/api/projects/${projectId}/progress`,
        {
          progress: parseInt(newProgress),
        }
      );
      console.log("Progress update response:", response.data); // Debugging line
      alert("Progress updated successfully!");
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === projectId ? response.data : project
        )
      );
    } catch (err) {
      console.error("Error updating progress:", err);
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("candidateName");
    localStorage.removeItem("isAdmin");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div>
      {/* Logout button at the top-right corner */}
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>

      <h1>Candidate Dashboard</h1>
      <h2>Welcome, {candidateName}</h2>

      {projects.length > 0 ? (
        projects.map((project) => (
          <div
            key={project._id}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{project.title}</h3>
            <p>
              <strong>Description:</strong> {project.description}
            </p>
            <p>
              <strong>Progress:</strong> {project.progress}%
            </p>
            <p>
              <strong>Status:</strong> {project.status}
            </p>
            <p>
              <strong>Score:</strong> {project.score}
            </p>

            <div>
              <input
                type="number"
                placeholder="Update Progress (0-100)"
                value={progress[project._id] || ""}
                onChange={(e) =>
                  setProgress({ ...progress, [project._id]: e.target.value })
                }
                min="0"
                max="100"
              />
              <button onClick={() => handleProgressUpdate(project._id)}>
                Update Progress
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No projects assigned to you.</p>
      )}
    </div>
  );
};

export default CandidateDashboard;
