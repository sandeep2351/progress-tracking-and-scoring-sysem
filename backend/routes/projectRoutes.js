const express = require('express');
const router = express.Router();
const { assignProject, getAllProjects, getProjectsByCandidate, acceptProject, updateProgress } = require('../Controllers/projectController');
const isAdmin = require('../middleware/isAdmin');

// Admin routes (Require admin access)
router.post('/assign', isAdmin, assignProject);
router.get('/candidates', isAdmin, getAllProjects);

// Candidate routes (No admin check)
router.get('/:candidateName', getProjectsByCandidate);
router.put('/:id/accept', acceptProject);
router.put('/:id', updateProgress);

module.exports = router;
