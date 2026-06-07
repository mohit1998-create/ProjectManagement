# Role-Based Project & Task Management System

A full-stack MERN application that enables organizations to manage projects, assign tasks, track employee work logs, monitor project progress, and automate deadline notifications through role-based access control (RBAC).

---

# 🚀 Features

## Authentication & Authorization

* JWT Authentication
* Login
* User Profile
* Role-Based Access Control (RBAC)
* Protected Routes
* Password Hashing using bcrypt

### Supported Roles

#### Admin

* Full system access
* Manage users
* Manage projects
* Manage tasks
* View reports
* View audit logs
* Access dashboards

#### Project Manager

* Manage assigned projects
* Create and assign tasks
* Review employee work logs
* Reply to work logs
* View project reports

#### Employee

* View assigned tasks
* Update task status
* Submit work logs
* Upload attachments
* Receive notifications

---

# 📦 Modules

## User Management

### Features

* Create User
* Get Users
* Get User By ID
* Update User
* Soft Delete User
* Search Users
* Pagination
* Role Filtering

---

## Project Management

### Features

* Create Project
* Get Projects
* Get Project By ID
* Update Project
* Archive Project
* Search Projects
* Filter By Status
* Filter By Project Manager
* Pagination

### Project Status

* Planning
* Active
* Completed
* Archived

### Visibility Rules

Admin:

* View all projects

Project Manager:

* View only assigned projects

Employee:

* No project management access

---

## Task Management

### Features

* Create Task
* Get Tasks
* Get Task By ID
* Update Task
* Update Task Status
* Archive Task
* Search Tasks
* Filter Tasks
* Pagination

### Task Status

* To Do
* In Progress
* In Review
* Completed
* Blocked

### Priority Levels

* Low
* Medium
* High
* Critical

### Visibility Rules

Admin:

* Access all tasks

Project Manager:

* Access tasks belonging to managed projects

Employee:

* Access only assigned tasks

---

## Work Log System

Employees can submit work progress.

### Features

* Create Work Log
* Get Work Logs
* Get Work Log By ID
* Update Work Log
* Archive Work Log
* File Attachments
* Search
* Filters
* Pagination

### Fields

* Description
* Hours Worked
* Timestamp
* Attachment (Optional)

### Visibility Rules

Admin:

* View all logs

Project Manager:

* View logs of assigned projects

Employee:

* View own logs only

---

## Log Reply System

Project Managers can respond to employee work logs.

### Features

* Create Reply
* Get Replies
* Get Reply By ID
* Update Reply
* Delete Reply
* Search
* Filters
* Pagination

### Visibility Rules

Admin:

* View all replies

Project Manager:

* Manage replies in assigned projects

Employee:

* View replies related to own work logs

---

## Notifications

### Features

* Task Assignment Notifications
* Reminder Notifications
* Overdue Notifications
* Mark As Read
* Mark All As Read

Notification Types:

* TASK_ASSIGNED
* REMINDER
* OVERDUE
* WORKLOG_REPLY

---

## Dashboard APIs

### Admin Dashboard

* Total Users
* Total Projects
* Total Tasks
* Active Employees
* Completed Tasks
* Overdue Tasks

### Project Manager Dashboard

* Managed Projects
* Active Tasks
* Employee Productivity
* Upcoming Deadlines

### Employee Dashboard

* Assigned Tasks
* Completed Tasks
* Pending Tasks
* Recent Work Logs

---

## Reports

### Project Report

* Completion Percentage
* Total Tasks
* Completed Tasks
* Pending Tasks

### Employee Report

* Assigned Tasks
* Completed Tasks
* Average Completion Time
* Total Hours Logged

---

## Audit Logs

Tracks all critical actions.

### Logged Events

* Login
* Project Creation
* Project Update
* Task Creation
* Task Update
* Task Assignment
* Status Changes
* Work Log Submission
* Work Log Reply
* User Updates

### Audit Fields

* User
* Action
* Entity
* Entity ID
* Previous Value
* New Value
* Timestamp

---

# 📧 Email Notification System

Automated email notifications using Nodemailer.

### Notifications

* Task Assigned
* 48 Hours Reminder
* 24 Hours Reminder
* 12 Hours Reminder
* 1 Hour Reminder
* Overdue Alert

Recipients:

* Assigned Employee
* Project Manager (for overdue tasks)

---

# ⏰ Background Jobs

Implemented using:

* node-cron

### Scheduled Tasks

Runs every hour and checks:

* Upcoming deadlines
* Overdue tasks

Prevents duplicate notifications using reminder tracking.

---

# 📁 File Uploads

Implemented using:

* Multer

Supported Files:

* PDF
* DOC
* DOCX
* JPG
* PNG

Maximum File Size:

* 5 MB

Uploaded files are stored in:

/uploads

---

# 🛡 Security Features

* JWT Authentication
* Password Hashing (bcrypt)
* Role-Based Authorization
* Input Validation (Joi)
* Centralized Error Handling
* Soft Deletes
* Protected APIs

---

# 🏗 Architecture

Backend follows a modular architecture:

src/
├── config/
├── middleware/
├── jobs/
├── services/
├── modules/
│ ├── auth/
│ ├── users/
│ ├── projects/
│ ├── tasks/
│ ├── worklogs/
│ ├── logreplies/
│ ├── notifications/
│ ├── reports/
│ ├── dashboard/
│ └── auditlogs/

Each module contains:

* Model
* Service
* Controller
* Routes
* Validation

---

# 🗄 Database

MongoDB + Mongoose

Main Collections:

* Users
* Projects
* Tasks
* WorkLogs
* LogReplies
* Notifications
* AuditLogs

---

# ⚙️ Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Joi
* Multer
* Nodemailer
* Node Cron

## Frontend

* React
* React Router
* Redux Toolkit
* Material UI

---

# 🔧 Installation

## Clone Repository

git clone https://github.com/mohit1998-create/ProjectManagement.git

cd ProjectManagement

---

## Backend Setup

cd server

npm install

Create .env file

PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret

EMAIL_HOST=smtp.gmail.com

EMAIL_PORT=587

EMAIL_USER=your_email

EMAIL_PASS=your_app_password

Run Server

npm run dev

---

## Frontend Setup

cd client

npm install

npm run dev

---

# API Base URL

http://localhost:5000/api

---

# Future Enhancements

* Real-Time Notifications (Socket.io)
* Kanban Board
* Swagger Documentation
* Docker Deployment
* Unit Testing
* CI/CD Pipeline
* Multi-Tenant Support

---

# Assumptions

* Each project has one Project Manager.
* Employees can be assigned multiple tasks.
* Archived projects cannot be modified.
* Archived tasks are excluded from active listings.
* Reminder notifications are sent once per reminder type.
* Overdue notifications are sent only once.

---

# Author

Mohit Choudhary

Full Stack Developer

GitHub:
https://github.com/mohit1998-create

Email:
[mohit.developer1998@gmail.com](mailto:mohit.developer1998@gmail.com)
