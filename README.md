# Smart Real-Time Hospital Resource Dashboard

## Overview
A real-time hospital resource management system to monitor and manage doctors, blood bank, and emergency services.

## Objective
To build a simple, modular, stable, beginner-friendly, and fully functional backend architecture that supports future integration for doctor availability management, queue monitoring, blood stock tracking, emergency status updates, and live real-time synchronization using Socket.IO.

## Tech Stack
* **Frontend**: HTML, CSS, JavaScript, Tailwind CSS (Pending implementation)
* **Backend**: Node.js, Express.js, Socket.IO
* **Database**: SQLite

## Folder Structure
```
hospital-resource-dashboard/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── socket.js
│   ├── config/ (db.js)
│   ├── database/ (hospital.db)
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── utils/
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── reception.html
│   ├── css/
│   ├── js/
│   ├── assets/
│   └── components/
├── docs/
└── screenshots/
```

## Installation & Startup

1. **Navigate to the Backend directory**
   ```bash
   cd backend
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Start the Backend Server**
   ```bash
   npm start
   # Or for development with auto-restart:
   npm run dev
   ```

The server will automatically create the SQLite database `hospital.db` and insert sample data on its first run.

