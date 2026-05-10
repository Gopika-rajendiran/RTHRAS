const socket = io("http://localhost:5000");

socket.on("connect", () => {
    console.log("Connected to Socket.IO Server with ID:", socket.id);
});

socket.on("disconnect", () => {
    console.log("Disconnected from Socket.IO Server");
});

// Centralized Event Listeners
socket.on("doctorsUpdated", () => {
    if (typeof fetchDoctors === 'function') fetchDoctors();
});

socket.on("bloodUpdated", () => {
    if (typeof fetchBloodStock === 'function') fetchBloodStock();
});

socket.on("emergencyUpdated", () => {
    if (typeof fetchEmergencyStatus === 'function') fetchEmergencyStatus();
});

// Export the socket instance for reuse if needed in modules, 
// though global functions handle the updates here.
window.socket = socket;
