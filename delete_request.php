<?php
// Include the database connection file
include 'db_connect.php';

// Check if an 'id' parameter is present in the URL and is a valid number
if (isset($_GET['id']) && is_numeric($_GET['id'])) {
    $id = (int)$_GET['id'];

        // Prepare the SQL DELETE query to remove the record with the given ID
    $sql = "DELETE FROM relief_requests WHERE id=$id";

    // Execute the query and check if it was successful
    if ($conn->query($sql) === TRUE) {
        // If successful, show an alert and redirect back to 'my_requests.php'
        echo "<script>
                alert('Request Deleted Successfully');          
                window.location='my_requests.php';
              </script>";
    } else {
                // If there is an error while deleting, display the error message
        echo "Error deleting request: " . $conn->error;
    }
} else {
        // If the 'id' is missing or invalid, show an alert and redirect back
    echo "<script>
            alert('Invalid Request ID');
            window.location='my_requests.php';
          </script>";
}
$conn->close();
?>