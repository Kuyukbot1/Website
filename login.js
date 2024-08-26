// Cek jika ada data users di localStorage, jika tidak ada, inisialisasi dengan user default
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify({
        admin: { password: "admin", expires: null },   // Admin tanpa tanggal kadaluarsa
        anonymous: { password: "anonymous", expires: null }  // User default tanpa tanggal kadaluarsa
    }));
}

// Fungsi login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('loginError');

    // Ambil data users dari localStorage
    const users = JSON.parse(localStorage.getItem('users'));

    // Cek apakah username ada dalam daftar dan password sesuai
    if (users[username]) {
        // Cek apakah user sudah kadaluarsa
        const expires = users[username].expires;
        const currentDate = new Date();

        if (expires && new Date(expires) < currentDate) {
            loginError.textContent = 'Akun ini telah kadaluarsa.';
            loginError.style.display = 'block';
            return;
        }

        // Cek password
        if (users[username].password === password) {
            if (username === 'admin') {
                // Redirect ke halaman admin jika login sebagai admin
                window.location.href = 'admin.html';
            } else {
                // Redirect ke halaman utama jika login berhasil
                window.location.href = 'main.html';
            }
        } else {
            loginError.textContent = 'Password salah.';
            loginError.style.display = 'block';
        }
    } else {
        loginError.textContent = 'Username tidak ditemukan.';
        loginError.style.display = 'block';
    }
}
