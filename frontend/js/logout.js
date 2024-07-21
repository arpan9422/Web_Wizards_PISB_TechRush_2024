
const server_addr = "http://localhost:3000/user/Logout"

var delete_cookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

function logout() {
    // Clear the JWT token from local storage or session storage
    localStorage.removeItem('auth_tok');
    sessionStorage.removeItem('auth_tok');
    delete_cookie('auth_tok')

    // Redirect to the login page
    window.location.href = '/landing.html';
}

// Attach the logout function to a logout button
document.getElementById('logoutBtn').addEventListener('click', logout);
