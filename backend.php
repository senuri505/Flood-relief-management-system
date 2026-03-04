<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "disaster_management_db";

$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

echo "Connected successfully!";
?>