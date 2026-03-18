let allUsers = [];
let userToDeleteId = null;


document.addEventListener('DOMContentLoaded', function () {
    // 1. Setup Menu Toggle FIRST
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    // Toggle Sidebar
    if (menuToggle) {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent click from bubbling
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside on main content
    if (mainContent && sidebar) {
        mainContent.addEventListener('click', function () {
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    }

    // 2. Then Load Dashboard Data
    loadUsers();
});

function loadUsers() {
    fetch('admin_users_backend.php?action=get_users')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            allUsers = Array.isArray(data) ? data : [];
            renderTable(allUsers);
            const userCountEl = document.getElementById('userCount');
            if (userCountEl) userCountEl.innerText = allUsers.length;
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            const tbody = document.getElementById('userTable');
            if (tbody) tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:red;">Failed to load users.</td></tr>';
        });
}

function renderTable(users) {
    const tbody = document.getElementById('userTable');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (!users || users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center">No users found.</td></tr>';
        return;
    }

    users.forEach(user => {
        const role = (user.role || '').toLowerCase();
        const badgeClass = role.includes('admin') ? 'badge-pending' : 'badge-approved';

        const row = `
            <tr>
                <td>${user.id}</td>
                <td>${user.full_name || 'N/A'}</td>
                <td>${user.email || 'N/A'}</td>
                <td><span class="badge ${badgeClass}">${user.role || 'User'}</span></td>
                <td>${user.total_requests || 0}</td>
                <td>
                    <button onclick="viewUser(${user.id})" style="margin-right:10px; padding:6px 12px; cursor:pointer; background:white; border:1px solid #e2e8f0; border-radius:6px; color:#475569; font-weight:500;">View</button>
                    <button onclick="openDeleteModal(${user.id})" style="color:#ef4444; background:none; border:none; cursor:pointer; font-weight:600; font-size:14px; padding:6px;">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function viewUser(id) {
    window.location.href = `admin_user_details.html?id=${id}`;
}

function filterTable() {
    const term = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
    if (!allUsers || !Array.isArray(allUsers)) return;

    const filtered = allUsers.filter(user => {
        const name = (user.full_name || '').toLowerCase();
        const email = (user.email || '').toLowerCase();
        return name.includes(term) || email.includes(term);
    });
    renderTable(filtered);
}

// Modal Functions
function openDeleteModal(id) {
    userToDeleteId = id;
    document.getElementById('deleteModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('deleteModal').style.display = 'none';
    userToDeleteId = null;
}

function confirmDelete() {
    if (!userToDeleteId) return;

    const formData = new FormData();
    formData.append('user_id', userToDeleteId);

    fetch('admin_users_backend.php?action=delete_user', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('User deleted successfully!');
                closeModal();
                loadUsers(); // Reload table
            } else {
                alert('Error deleting user.');
            }
        });
}

