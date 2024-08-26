// Fungsi untuk menambah user baru
function addUser() {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const addUserSuccess = document.getElementById('addUserSuccess');

    // Tambahkan user baru ke dalam daftar users
    if (newUsername && newPassword) {
        users[newUsername] = newPassword;
        addUserSuccess.style.display = 'block';
        document.getElementById('addUserForm').reset();
    } else {
        alert('Username dan Password harus diisi!');
    }
}
