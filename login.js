function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('loginError');

    // Cek username dan password
    if (username === 'anonymous' && password === 'anonymous') {
        // Redirect ke halaman utama jika login berhasil
        window.location.href = 'main.html';
    } else {
        // Tampilkan pesan kesalahan jika login gagal
        loginError.style.display = 'block';
    }
}
