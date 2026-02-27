let allUsers = [];
let userToDeleteId = null;

// Load users on page start
document.addEventListener('DOMContentLoaded', loadUsers);

function loadUsers() {
    fetch('admin_users_backend.php?action=get_users')
        .then(response => response.json())
        .then(data => {
            allUsers = data;
            renderTable(allUsers);
            document.getElementById('userCount').innerText = allUsers.length;
        })
        .catch(error => console.error('Error:', error));
}

// Render the HTML table rows
function renderTable(users) {
    const tbody = document.getElementById('userTable');
    tbody.innerHTML = '';

    if (users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center">No users found.</td></tr>';
        return;
    }

    users.forEach(user => {
        const badgeClass = user.role === 'admin' ? 'badge-pending' : 'badge-approved'; // Reusing badge colors
        
        // --- HERE IS WHERE THE BUTTONS ARE CREATED ---
        const row = `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td><span class="badge ${badgeClass}">${user.role}</span></td>
                <td>${user.total_requests}</td>
                <td>
                    <!-- VIEW BUTTON ADDED HERE -->
                    <button onclick="viewUser(${user.id})" style="margin-right:10px; padding:5px 10px; cursor:pointer; background:#e2e8f0; border:none; border-radius:4px;">View</button>
                    
                    <!-- DELETE BUTTON -->
                    <button onclick="openDeleteModal(${user.id})" style="color:red; background:none; border:none; cursor:pointer; font-weight:bold;">Delete</button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// --- NEW FUNCTION TO HANDLE VIEW CLICK ---
function viewUser(id) {
    // This redirects to the details page we created in the previous step
    window.location.href = `admin_user_details.html?id=${id}`;
}

// Client-side Search/Filter
function filterTable() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = allUsers.filter(user => 
        user.name.toLowerCase().includes(term) || 
        user.email.toLowerCase().includes(term)
    );
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
