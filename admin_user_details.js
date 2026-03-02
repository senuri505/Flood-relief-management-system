document.addEventListener('DOMContentLoaded', function() {
    // 1. Get User ID from URL (e.g., admin_user_details.html?id=5)
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    if (userId) {
        fetchUserDetails(userId);
    } else {
        alert('No User ID provided');
        window.location.href = 'admin_users.html';
    }
});

function fetchUserDetails(id) {
    // Fetch basic user info
    fetch(`admin_users_backend.php?action=get_user_details&id=${id}`)
        .then(res => res.json())
        .then(user => {
            if (!user) {
                alert('User not found');
                return;
            }
            // Fill the Profile Card
            document.getElementById('detailName').innerText = user.name;
            document.getElementById('detailId').innerText = '#' + user.id;
            document.getElementById('detailEmail').innerText = user.email;
            document.getElementById('detailRole').innerText = user.role.toUpperCase();
            document.getElementById('detailDate').innerText = user.created_at;

            // Fetch this user's specific requests
            fetchUserRequests(id);
        })
        .catch(err => console.error(err));
}

function fetchUserRequests(userId) {
    // Note: You can add a new action in your PHP to get requests by user_id
    // For now, we assume a generic endpoint or you can reuse the report logic.
    // Here is a simple simulated fetch assuming you add this to backend:
    fetch(`admin_users_backend.php?action=get_user_requests&id=${userId}`)
        .then(res => res.json())
        .then(requests => {
            const tbody = document.getElementById('userRequestsTable');
            tbody.innerHTML = '';

            if(requests.length === 0) {
                tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">No requests submitted.</td></tr>';
                return;
            }

            requests.forEach(req => {
                const row = `
                    <tr>
                        <td>#${req.id}</td>
                        <td>${req.type}</td>
                        <td>${req.severity}</td>
                        <td>${req.status}</td>
                    </tr>
                `;
                tbody.innerHTML += row;
            });
        });
}