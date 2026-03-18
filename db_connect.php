<?php

// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$database = "disaster_management_db";


// Create a new connection to MySQL using mysqli
$conn = new mysqli($servername, $username, $password, $database);


// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";          // Connection successful


?>