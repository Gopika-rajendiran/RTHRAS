const express = require('express');
const http = require('http');
const cors = require('cors');
const { initSocket } = require('./socket');
require('./config/db'); // Initialize DB and tables on startup

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Socket.IO
initSocket(server);

const path = require('path');

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Modular Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/blood', require('./routes/bloodRoutes'));
app.use('/api/emergency', require('./routes/emergencyRoutes'));

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
