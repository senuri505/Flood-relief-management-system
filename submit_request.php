<?php
// Start session to get logged-in user id
session_start();

// Include the database connection file
include 'db_connect.php'; 

// Check if the form was submitted using POST method
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Make sure user_id exists in session
    if (!isset($_SESSION['user_id'])) {
        echo "<script>
                alert('Error: You must be logged in to submit a request.');
                window.location.href='login.html';
              </script>";
        exit();
    }

    $user_id = (int)$_SESSION['user_id']; // logged-in user id

    // Get and sanitize form data to prevent SQL injection
    $relief_type = $conn->real_escape_string($_POST['relief_type']);
    $district = $conn->real_escape_string($_POST['district']);
    $divisional_secretariat = $conn->real_escape_string($_POST['divisional_secretariat']);
    $gn_division = $conn->real_escape_string($_POST['gn_division']);
    $contact_person = $conn->real_escape_string($_POST['contact_person']);
    $contact_number = $conn->real_escape_string($_POST['contact_number']);
    $address = $conn->real_escape_string($_POST['address']);
    $family_members = (int)$_POST['family_members'];
    $severity_level = $conn->real_escape_string($_POST['severity_level']);
    $special_needs = $conn->real_escape_string($_POST['special_needs']);

    // Prepare SQL query to insert data into 'relief_requests' table
    $sql = "INSERT INTO relief_requests
            (user_id, relief_type, district, divisional_secretariat, gn_division, contact_person, contact_number, address, family_members, severity_level, special_needs)
            VALUES
            ($user_id, '$relief_type', '$district', '$divisional_secretariat', '$gn_division', '$contact_person', '$contact_number', '$address', $family_members, '$severity_level', '$special_needs')";

    // Execute the query and check if it was successful
    if ($conn->query($sql) === TRUE) {
        // Show success alert and redirect back to the submit request page
        echo "<script>
                alert('Your relief request has been submitted successfully!');
                window.location.href='submit_request.html';
              </script>";
    } else {
        // Show error message if query failed
        echo "Error: " . $conn->error;
    }

    $conn->close();
}
?>