import axios from 'axios';

const API_URL = 'http://localhost:5005/api/projects';

// Get all projects
export const getProjects = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;  // Return the list of projects
    } catch (error) {
        throw new Error('Error fetching projects');
    }
};

// Accept a project
export const acceptProject = async (id) => {
    try {
        const response = await axios.put(`${API_URL}/${id}/accept`);
        return response.data;  // Return the updated project
    } catch (error) {
        throw new Error('Error accepting project');
    }
};

// Update project progress
export const updateProgress = async (id, progress) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, { progress });
        return response.data;  // Return the updated project
    } catch (error) {
        throw new Error('Error updating progress');
    }
};
