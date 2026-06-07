# Project Management System

## Overview

A RESTful Project Management API built with Node.js, Express.js, and MongoDB. The system enables organizations to manage projects, tasks, team members, and work logs efficiently through role-based access control.

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Role-Based Access Control
* Protected Routes
* User Profile Management

### Project Management

* Create Projects
* Update Projects
* Delete Projects
* View Project Details
* Assign Project Managers
* Track Project Status

### Task Management

* Create Tasks
* Assign Tasks to Team Members
* Update Task Status
* Task Priority Management
* Due Date Tracking
* Task Progress Monitoring

### Work Logs

* Create Work Logs
* Track Hours Worked
* Add Work Descriptions
* View Work History
* Associate Logs with Tasks

### File Uploads

* Upload Task Attachments
* Store Supporting Documents
* File Validation

### Notifications & Automation

* Scheduled Cron Jobs
* Automated Status Updates
* Deadline Monitoring

---

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose ODM

### Authentication

* JSON Web Token (JWT)
* bcrypt

### Utilities

* Multer (File Uploads)
* Node Cron
* Express Validator

---

## Project Structure

```text
src/
│
├── config/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── projects/
│   ├── tasks/
│   ├── worklogs/
│   └── uploads/
│
├── middleware/
├── services/
├── utils/
├── jobs/
├── routes/
└── app.js

server.js
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/mohit1998-create/ProjectManagement.git

cd ProjectManagement
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create a `.env` file in the root directory.

```env
PORT=5000

MONGODB_URI=mongodb://localhost:27017/project_management

JWT_SECRET=your_jwt_secret

JWT_EXPIRES_IN=7d
```

### Run Development Server

```bash
npm run dev
```

### Run Production Server

```bash
npm start
```

---

## API Modules

### Auth APIs

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

### User APIs

```http
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
```

### Project APIs

```http
POST   /api/projects
GET    /api/projects
GET    /api/projects/:id
PUT    /api/projects/:id
DELETE /api/projects/:id
```

### Task APIs

```http
POST   /api/tasks
GET    /api/tasks
GET    /api/tasks/:id
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

### Work Log APIs

```http
POST   /api/worklogs
GET    /api/worklogs
GET    /api/worklogs/:id
```

---

## Architecture Decisions

### Layered Architecture

The application follows a layered architecture:

```text
Controller
    ↓
Service
    ↓
Repository/Model
    ↓
MongoDB
```

Benefits:

* Better maintainability
* Separation of concerns
* Easier testing
* Scalability

### JWT Authentication

JWT is used for stateless authentication to improve scalability and simplify API consumption.

### MongoDB

MongoDB was selected because:

* Flexible schema design
* Fast development
* Suitable for project and task management data structures

---

## Assumptions

* Every user has a valid role.
* Only authorized users can access protected routes.
* Tasks belong to a project.
* Work logs are associated with tasks.
* File uploads are validated before storage.
* JWT tokens are required for protected APIs.

---

## Future Improvements

* Email Notifications
* Real-Time Updates using WebSockets
* Dashboard Analytics
* Activity Logs
* Team Chat Module
* Docker Deployment
* Unit & Integration Testing
* CI/CD Pipeline

---

## Author

Mohit Choudhary

GitHub:
https://github.com/mohit1998-create

Email:
[mohit.developer1998@gmail.com](mailto:mohit.developer1998@gmail.com)
