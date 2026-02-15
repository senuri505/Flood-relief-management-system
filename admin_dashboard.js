document.addEventListener('DOMContentLoaded', function() {
    // 1. Setup Menu Toggle FIRST
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    // Toggle Sidebar
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent click from bubbling
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside on main content
    if (mainContent && sidebar) {
        mainContent.addEventListener('click', function() {
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    }

    // 2. Then Load Dashboard Data
    loadDashboardData();
});

function loadDashboardData() {
    // Fetch data from the PHP file
    fetch('fetch_dashboard.php')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            // 1. Update Stats Cards
            document.getElementById('totalUsers').innerText = data.stats.totalUsers;
            document.getElementById('totalRequests').innerText = data.stats.totalRequests;
            document.getElementById('highSeverity').innerText = data.stats.highSeverity;
            document.getElementById('pendingRequests').innerText = data.stats.pending;

            // 2. Update Bar Charts
            updateBars(data.reliefData);

            // 3. Update Table
            updateTable(data.recentRequests);
        })
        .catch(error => {
            console.error('Error loading data:', error);
            document.getElementById('requestsTableBody').innerHTML = 
                '<tr><td colspan="6" style="text-align:center; color:red;">Failed to load data.</td></tr>';
        });
}

function updateBars(reliefData) {
    // Calculate total to find percentage
    const total = reliefData.food + reliefData.water + reliefData.medicine + reliefData.shelter;
    
    // Helper to set width
    const setWidth = (id, count) => {
        const percentage = total === 0 ? 0 : (count / total) * 100;
        document.getElementById(id).style.width = percentage + '%';
    };

    // Update Text Counts
    document.getElementById('foodCount').innerText = reliefData.food;
    document.getElementById('waterCount').innerText = reliefData.water;
    document.getElementById('medicineCount').innerText = reliefData.medicine;
    document.getElementById('shelterCount').innerText = reliefData.shelter;

    // Update Visual Widths
    setWidth('foodBar', reliefData.food);
    setWidth('waterBar', reliefData.water);
    setWidth('medicineBar', reliefData.medicine);
    setWidth('shelterBar', reliefData.shelter);
}

function updateTable(requests) {
    const tbody = document.getElementById('requestsTableBody');
    tbody.innerHTML = ''; // Clear loading text

    if (requests.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No requests found.</td></tr>';
        return;
    }

    requests.forEach(req => {
        // Determine badge class for severity
        let severityClass = 'badge-low';
        if (req.severity === 'Medium') severityClass = 'badge-medium';
        if (req.severity === 'High') severityClass = 'badge-high';

        // Determine badge class for status
        let statusClass = 'badge-pending';
        if (req.status === 'Approved') statusClass = 'badge-approved';

        const row = `
            <tr>
                <td>#${req.id}</td>
                <td>${req.userName}</td>
                <td>${req.reliefTypes[0]}</td>
                <td>${req.district}</td>
                <td><span class="badge ${severityClass}">${req.severity}</span></td>
                <td><span class="badge ${statusClass}">${req.status}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}
