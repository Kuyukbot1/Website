// Fungsi untuk menambah user baru atau memperbarui user yang sudah ada
function addUser() {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const expires = document.getElementById('expires').value; // Ambil nilai kadaluarsa
    const addUserSuccess = document.getElementById('addUserSuccess');

    // Ambil data users dari localStorage
    const users = JSON.parse(localStorage.getItem('users'));

    if (newUsername && newPassword) {
        users[newUsername] = {
            password: newPassword,
            expires: expires ? new Date(expires).toISOString() : null // Set atau perbarui tanggal kadaluarsa
        };
        localStorage.setItem('users', JSON.stringify(users));
        addUserSuccess.style.display = 'block';
        document.getElementById('addUserForm').reset();
        loadUserList(); // Refresh daftar user
    } else {
        alert('Username dan Password harus diisi!');
    }
}

// Fungsi untuk menghapus user
function deleteUser(username) {
    if (username === 'admin') {
        alert('Admin tidak dapat dihapus.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users'));
    if (users[username]) {
        delete users[username];
        localStorage.setItem('users', JSON.stringify(users));
        loadUserList(); // Refresh daftar user
    }
}

// Fungsi untuk mengedit tanggal expired user
function editUserExpires(username) {
    const users = JSON.parse(localStorage.getItem('users'));
    const newExpires = prompt("Masukkan tanggal kadaluarsa baru (YYYY-MM-DD) atau kosongkan untuk menghapus tanggal kadaluarsa:");

    if (newExpires === null) {
        return; // User membatalkan prompt
    }

    if (newExpires) {
        users[username].expires = new Date(newExpires).toISOString();
    } else {
        users[username].expires = null; // Menghapus tanggal kadaluarsa
    }

    localStorage.setItem('users', JSON.stringify(users));
    loadUserList(); // Refresh daftar user
}

// Fungsi untuk memuat daftar user ke dalam tabel
function loadUserList() {
    const users = JSON.parse(localStorage.getItem('users'));
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    for (const username in users) {
        const expires = users[username].expires ? new Date(users[username].expires).toLocaleDateString() : 'Tidak ada';

        userList.innerHTML += `
            <tr>
                <td>${username}</td>
                <td>${expires}</td>
                <td>
                    ${username !== 'admin' ? `<button onclick="deleteUser('${username}')" class="btn btn-danger">Hapus</button>` : ''}
                    <button onclick="editUserExpires('${username}')" class="btn btn-warning">Edit Kadaluarsa</button>
                </td>
            </tr>
        `;
    }
}

// Panggil fungsi ini saat halaman admin dimuat untuk menampilkan daftar user
document.addEventListener('DOMContentLoaded', loadUserList);
