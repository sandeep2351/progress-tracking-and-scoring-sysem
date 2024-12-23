# Ionots EdTech Platform - MVP (MERN Stack)

## Description

A web-based project management system built with the MERN stack (MongoDB, Express.js, React.js, and Node.js). The platform allows admins to assign and track candidate projects, while candidates can view their assigned tasks, update progress, and track project status.

## Setup Instructions

### 1. Initialize the Application

#### Backend (Node.js + Express)

1. **Create the backend folder and initialize Node.js:**

    ```bash
    mkdir backend
    cd backend
    npm init -y
    ```

2. **Install required dependencies:**

    ```bash
    npm install express mongoose dotenv cors
    npm install nodemon --save-dev

4. **Run the server:** Add the following script to `package.json`:

    ```json
    "scripts": {
        "start": "node server.js",
        "dev": "nodemon server.js"
    }
    ```

    Run the server with:

    ```bash
    npm run dev
    ```

#### Frontend (React.js)

1. **Create the frontend app:**

    ```bash
    npx create-react-app frontend
    cd frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install axios react-router-dom
    ```

3. **Run the React app:**

    ```bash
    npm start
    ```

---

