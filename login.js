// Daftar user yang ada (di sini disimpan secara lokal dalam JS)
let users = {
    admin: "admin123",  // Admin dengan password "admin123"
    anonymous: "anonymous"  // User default
};

// Fungsi login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('loginError');

    // Cek apakah username dan password sesuai dengan yang ada di daftar user
    if (users[username] && users[username] === password) {
        if (username === 'admin') {
            
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'main.html';
        }
    } else {
        loginError.style.display = 'block';
    }
}
