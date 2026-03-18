<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>My Requests</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Link to your custom CSS file -->
<link rel="stylesheet" href="my_requests.css">

<!-- Link to Font Awesome icons for buttons and navigation -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
</head>

<body>

<!-- Top Navigation Bar -->
<header class="topbar">
    <!-- Hamburger menu for mobile view -->
    <label for="menu-toggle" class="hamburger">
        <span></span>
        <span></span>
        <span></span>
    </label>
    <h3>Flood Relief</h3>
</header>


<div class="container">

    <!-- Sidebar Navigation -->
    <aside class="sidebar">
        <h2>Flood Relief</h2>
        <a href="home.html"><i class="fas fa-home"></i> Home</a>
        <a href="submit_request.html"><i class="fas fa-file-alt"></i> Submit Request</a>
        <a href="my_requests.php" class="active"><i class="fas fa-list"></i> My Requests</a>
        <a href="main.html"><i class="fas fa-sign-out-alt"></i> Logout</a>
    </aside>

    <!-- Main Content -->
    <main class="main">

        <!-- Hero Section -->
        <section class="hero">
            <div class="hero-overlay">
                <h1>My Requests</h1>
            </div>
        </section>

        <!-- Card containing the table of requests -->
        <div class="card">
            <h2>My Relief Requests</h2>

            <table class="requests-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Relief Type</th>
                        <th>District</th>
                        <th>DS Division</th>
                        <th>GN Division</th>
                        <th>Contact Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <?php 
                    // Include database connection
                    include "db_connect.php"; 

                    // Select all relief requests from database, latest first
                    $sql = "SELECT * FROM relief_requests ORDER BY created_at DESC";
                    $result = $conn->query($sql);

                    if($result->num_rows > 0){
                        while($row = $result->fetch_assoc()){
                            echo "<tr>
                                <td>".$row['id']."</td>
                                <td>".$row['relief_type']."</td>
                                <td>".$row['district']."</td>
                                <td>".$row['divisional_secretariat']."</td>
                                <td>".$row['gn_division']."</td>
                                <td>".$row['contact_person']."</td>
                                <td>
                                    <!-- View Button: passes all details to JS function -->
                                    <button class='btn-view' onclick='viewRequest(
                                        \"".$row['relief_type']."\",
                                        \"".$row['district']."\",
                                        \"".$row['divisional_secretariat']."\",
                                        \"".$row['gn_division']."\",
                                        \"".$row['contact_person']."\",
                                        \"".$row['contact_number']."\",
                                        \"".$row['address']."\",
                                        \"".$row['family_members']."\",
                                        \"".$row['severity_level']."\",
                                        \"".$row['special_needs']."\")'>
                                        View
                                    </button>

                                    <!-- Update Button: opens update modal -->
                                    <button class='btn-update' onclick='openUpdateModal(".$row['id'].",\"".$row['relief_type']."\",\"".$row['severity_level']."\")'>
                                        Update
                                    </button>

                                    <!-- Delete Button: calls JS delete function -->
                                    <button class='btn-delete' onclick='deleteRequest(".$row['id'].")'>
                                        Delete
                                    </button>
                                </td>
                            </tr>";
                        }
                    } else {
                        // Show message if no requests found
                        echo "<tr><td colspan='7'>No Requests Found</td></tr>";
                    }

                    // Close database connection
                    $conn->close();
                    ?>
                </tbody>
            </table>
        </div>

        <!-- VIEW MODAL -->
        <div class="modal" id="viewModal">
            <div class="modal-content">
                <span class="close" onclick="closeViewModal()">&times;</span>
                <h2>Request Details</h2>
                <div id="viewContent"></div>
            </div>
        </div>

        <!-- UPDATE MODAL -->
        <div class="modal" id="updateModal">
            <div class="modal-content"></div>
        </div>

    </main>
</div>

<!-- Footer Section -->
<footer class="footer">
    <div class="footer-content">
        <p>© 2026 Flood Relief Management System</p>
        <p>Designed by University of Sri Jayewardenepura</p>
    </div>
</footer>

<!-- Link to external JavaScript file -->
<script src="my_requests.js"></script>

</body>
</html>