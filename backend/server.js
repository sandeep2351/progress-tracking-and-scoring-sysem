const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5005;

// Import routes
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require("./routes/authRoutes");
// const adminRoutes = require("./routes/adminRoutes");

// Import middlewares
const authenticate = require('./middleware/authenticate');
const isAdmin = require('./middleware/isAdmin');

// Middleware
app.use(express.json());  // To parse JSON request bodies
app.use(cors());  // To handle cross-origin requests

// API Routes
app.use('/api/projects', authenticate, projectRoutes); // Protect project routes with authentication
app.use("/api/auth", authRoutes);  // No authentication for login/register routes

// Admin Routes (Ensure only admins can access these)
// app.use('/api/admin', authenticate, isAdmin, adminRoutes);  // Admin routes protected with both authentication and admin check

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB Connected");
}).catch((err) => {
    console.log("MongoDB connection error:", err);
});

// Routes placeholder
app.get('/', (req, res) => {
    res.send("API is running");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
