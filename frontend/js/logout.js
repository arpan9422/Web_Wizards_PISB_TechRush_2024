
const logout = document.getElementById("logoutBtn");

const server_addr = "http://localhost:3000/user/Logout"

function logout() {
    // Clear the JWT token from local storage or session storage
    localStorage.removeItem('auth_tok');
    sessionStorage.removeItem('auth_tok');

    // Redirect to the login page
    window.location.href = '/login';
}

// Attach the logout function to a logout button
document.getElementById('logoutBtn').addEventListener('click', logout);
