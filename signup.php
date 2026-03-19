<?php

// Include the database connection file
include "db_connect.php";

// Check if the registration form has been submitted
if(isset($_POST['register'])){

    // Get data from the form
    $name = $_POST['full_name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $role = $_POST['role'];

    // Prepare SQL query
    $sql = "INSERT INTO users (full_name, email, password, role)
            VALUES ('$name', '$email', '$password', '$role')";

    // Execute the query
    if(mysqli_query($conn, $sql)){
        
        // Show success message + redirect
        echo "<script>
                alert('Registration Successful!');
                window.location.href = 'main.html';
              </script>";
        exit();

    } else {
        echo "Error: " . mysqli_error($conn);
    }
}

?>