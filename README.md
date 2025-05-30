<<<<<<< HEAD
﻿# Task-Manager
Let me explain this Task Manager project in detail:

Project Overview:
It's a full-stack task management application built with Node.js and Express
Uses a file-based storage system (tasks.json) to persist data
Features a modern, dark-themed user interface
Core Features:
Create, read, update, and delete tasks (CRUD operations)
Filter tasks by status (pending, in-progress, completed)
Filter tasks by priority (low, medium, high)
Set due dates for tasks
Real-time status updates
Responsive design for mobile devices
Technical Architecture:
Backend:

Server: Express.js web server (server.js)
Routes: Organized in taskRoutes.js
Controllers: Business logic in taskController.js
Models: Data handling in taskModel.js
Storage: File-based using tasks.json
Frontend:

Views: EJS templating (index.ejs)
Styling: Custom CSS with variables (styles.css)
JavaScript: Client-side logic (main.js)
Components: Modal for editing tasks
Key Features Explained:
User Interface:
Clean, modern dark theme
Intuitive task cards with priority indicators
Modal-based edit interface
Responsive design for all screen sizes
Interactive notifications for user actions
Data Flow:
User interacts with the UI
Client-side JavaScript handles the interaction
API requests are made to the server
Server processes requests through routes and controllers
Data is persisted to tasks.json
UI updates to reflect changes
To run the project:

Install dependencies: npm install
Start the server: npm run dev
Access the application at http://localhost:3000
The project demonstrates a complete full-stack application with proper separation of concerns, error handling, and a user-friendly interface.
=======
﻿# Task-Manager
Let me explain this Task Manager project in detail:

Project Overview:
It's a full-stack task management application built with Node.js and Express
Uses a file-based storage system (tasks.json) to persist data
Features a modern, dark-themed user interface
Core Features:
Create, read, update, and delete tasks (CRUD operations)
Filter tasks by status (pending, in-progress, completed)
Filter tasks by priority (low, medium, high)
Set due dates for tasks
Real-time status updates
Responsive design for mobile devices
Technical Architecture:
Backend:

Server: Express.js web server (server.js)
Routes: Organized in taskRoutes.js
Controllers: Business logic in taskController.js
Models: Data handling in taskModel.js
Storage: File-based using tasks.json
Frontend:

Views: EJS templating (index.ejs)
Styling: Custom CSS with variables (styles.css)
JavaScript: Client-side logic (main.js)
Components: Modal for editing tasks
Key Features Explained:
User Interface:
Clean, modern dark theme
Intuitive task cards with priority indicators
Modal-based edit interface
Responsive design for all screen sizes
Interactive notifications for user actions
Data Flow:
User interacts with the UI
Client-side JavaScript handles the interaction
API requests are made to the server
Server processes requests through routes and controllers
Data is persisted to tasks.json
UI updates to reflect changes
To run the project:

Install dependencies: npm install
Start the server: npm run dev
Access the application at http://localhost:3000
The project demonstrates a complete full-stack application with proper separation of concerns, error handling, and a user-friendly interface.
>>>>>>> 0cf2e48 (Initial commit)
