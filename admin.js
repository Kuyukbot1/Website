// Fungsi untuk menambah user baru
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
            expires: expires ? new Date(expires).toISOString() : null // Set tanggal kadaluarsa
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
    const users = JSON.parse(localStorage.getItem('users'));
    if (users[username]) {
        delete users[username];
        localStorage.setItem('users', JSON.stringify(users));
        loadUserList(); // Refresh daftar user
    }
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
                <td><button onclick="deleteUser('${username}')" class="btn btn-danger">Hapus</button></td>
            </tr>
        `;
    }
}

// Panggil fungsi ini saat halaman admin dimuat untuk menampilkan daftar user
document.addEventListener('DOMContentLoaded', loadUserList);
