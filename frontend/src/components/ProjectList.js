import React, { useState, useEffect } from 'react';
import { getProjects, acceptProject, updateProgress } from '../services/projectService';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    // Fetch all projects
    const fetchProjects = async () => {
        try {
            const response = await getProjects();
            setProjects(response.data); // Assuming response contains the data array
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // Handle project acceptance
    const handleAccept = async (id) => {
        try {
            await acceptProject(id);
            fetchProjects(); // Refresh the project list after acceptance
        } catch (error) {
            console.error("Error accepting project:", error);
        }
    };

    // Handle progress update
    const handleUpdateProgress = async (id, progress) => {
        try {
            await updateProgress(id, { progress }); // Send the updated progress to the backend
            fetchProjects(); // Refresh the project list after updating progress
        } catch (error) {
            console.error("Error updating progress:", error);
        }
    };

    return (
        <div className="project-list">
            <h1>Project Assignment List</h1>
            {projects.length === 0 ? (
                <p>No projects available</p>
            ) : (
                <ul>
                    {projects.map(project => (
                        <li key={project._id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <p>Status: {project.status}</p>
                            <p>Progress: {project.progress}%</p>
                            <p>Score: {project.score}</p>

                            {/* Accept Button */}
                            {project.status === "Pending" && (
                                <button 
                                    onClick={() => handleAccept(project._id)} 
                                    style={{ backgroundColor: '#28a745', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                                    className="accept-btn"
                                >
                                    Accept
                                </button>
                            )}

                            <div style={{ marginTop: '10px' }}>
                                <label>Update Progress: </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={project.progress}
                                    onChange={(e) => handleUpdateProgress(project._id, e.target.value)}
                                    style={{ width: '100%', marginTop: '10px' }}
                                />
                                <span>{project.progress}%</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProjectList;
