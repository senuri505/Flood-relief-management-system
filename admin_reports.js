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

   generateReport(); // Load default report on page load
});

function generateReport() {
    const district = document.getElementById('districtFilter').value;
    const type = document.getElementById('typeFilter').value;

    const formData = new FormData();
    formData.append('district', district);
    formData.append('type', type);

    // Call the backend
    fetch('admin_users_backend.php?action=get_filtered_report', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            // 1. Update Summary Cards
            document.getElementById('reportUsers').innerText = data.summary.total_users;
            document.getElementById('reportSevere').innerText = data.summary.high_severity;
            document.getElementById('reportFood').innerText = data.summary.food_requests;
            document.getElementById('reportMedicine').innerText = data.summary.medicine_requests;

            // 2. Update Table
            updateTable(data.requests);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('reportTableBody').innerHTML = '<tr><td colspan="8" style="text-align:center; color:red;">Error loading data. Check console for details.</td></tr>';
        });
}

function updateTable(requests) {
    const tbody = document.getElementById('reportTableBody');
    tbody.innerHTML = '';

    if (requests.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;">No records found.</td></tr>';
        return;
    }

    requests.forEach(req => {
        // Determine badge colors
        const sevClass = req.severity === 'High' ? 'badge-high' : (req.severity === 'Medium' ? 'badge-medium' : 'badge-low');
        const statusClass = req.status === 'Approved' ? 'badge-approved' : 'badge-pending';

        const row = `
            <tr>
                <td>#${req.id}</td>
                <td>${req.user_name}</td>
                <td>${req.type}</td>
                <td>${req.district || 'N/A'}</td>
                <td>${req.divisional_secretariat || 'N/A'}</td>
                <td>${req.gn_division || 'N/A'}</td>
                <td><span class="badge ${sevClass}">${req.severity}</span></td>
                <td><span class="badge ${statusClass}">${req.status}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}
