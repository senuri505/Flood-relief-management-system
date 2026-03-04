
document.addEventListener('DOMContentLoaded', function() {
    generateReport(); // Load default report on page load
});

function generateReport() {
    const district = document.getElementById('districtFilter').value;
    const type = document.getElementById('typeFilter').value;

    const formData = new FormData();
    formData.append('district', district);
    formData.append('type', type);

    // Call the backend
    fetch('admin_backend.php?action=get_filtered_report', {
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
        document.getElementById('reportTableBody').innerHTML = '<tr><td colspan="6" style="text-align:center; color:red;">Error loading data</td></tr>';
    });
}

function updateTable(requests) {
    const tbody = document.getElementById('reportTableBody');
    tbody.innerHTML = '';

    if (requests.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No records found.</td></tr>';
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
                <td>${req.district}</td>
                <td><span class="badge ${sevClass}">${req.severity}</span></td>
                <td><span class="badge ${statusClass}">${req.status}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}