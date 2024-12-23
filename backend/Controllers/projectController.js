const Project = require('../models/Project');

// Admin assigns a new project
exports.assignProject = async (req, res) => {
    const { title, description, candidateName } = req.body;

    try {
        const newProject = new Project({
            title,
            description,
            candidateName,
            progress: 0,
            status: "Pending",
            score: 0,
        });

        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Admin fetches all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Candidate fetches projects assigned to them
exports.getProjectsByCandidate = async (req, res) => {
    const { candidateName } = req.params;

    try {
        const projects = await Project.find({ candidateName });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Candidate accepts a project
exports.acceptProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        project.status = "Accepted";
        await project.save();
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Candidate updates project progress
exports.updateProgress = async (req, res) => {
    try {
        const { progress } = req.body;
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        project.progress = progress;
        await project.save();

        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
