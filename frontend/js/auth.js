document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Temporary demo login
            if (username === 'admin' && password === 'admin123') {
                errorMessage.classList.add('hidden');
                // Store auth state temporarily
                localStorage.setItem('isAuthenticated', 'true');
                window.location.href = 'index.html';
            } else {
                errorMessage.classList.remove('hidden');
            }
        });
    }

    // Protection logic for index/dashboard
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth && !window.location.pathname.includes('login.html') && !window.location.pathname.includes('reception.html')) {
        window.location.href = 'login.html';
    }
});
