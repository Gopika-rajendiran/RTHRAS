document.addEventListener('DOMContentLoaded', () => {
    // Logout Logic
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isAuthenticated');
            window.location.href = 'login.html';
        });
    }

    // Fetch and render initial data
    if (typeof fetchDoctors === 'function') fetchDoctors();
    if (typeof fetchBloodStock === 'function') fetchBloodStock();
    if (typeof fetchEmergencyStatus === 'function') fetchEmergencyStatus();
});
