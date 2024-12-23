import React, { useState } from 'react';
import { addProject } from '../services/projectService';  
import './ProjectForm.css'

function ProjectForm() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        assignedTo: ''
    });
    const [loading, setLoading] = useState(false);  // Track the loading state
    const [error, setError] = useState(null);       // Track any errors

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Set loading state to true while waiting for the request

        try {
            const response = await addProject(formData); // Send the form data to backend
            if (response.status === 201) { // Check for successful response
                alert('Project added successfully!');
                setFormData({ title: '', description: '', assignedTo: '' });  // Reset form
            } else {
                setError('Failed to add project');  // Handle failed response
            }
        } catch (error) {
            console.error("Error adding project:", error);
            setError('There was an error adding the project');
        } finally {
            setLoading(false);  // Set loading state to false once the request completes
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Project</h2>
            
            {/* Title Field */}
            <label>Title:</label>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
            />
            
            {/* Description Field */}
            <label>Description:</label>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter project description"
            />

            {/* Assigned To Field */}
            <label>Assigned To:</label>
            <input
                type="text"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                required
            />
            
            {/* Error Message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {/* Submit Button */}
            <button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Project'}
            </button>
        </form>
    );
}

export default ProjectForm;
