<?php

// Include the database connection file
include "db_connect.php";

// Start a session to store user data across pages
session_start();


// Check if the login form has been submitted
if(isset($_POST['login'])){


// Get the email and password entered by the user
    $email = $_POST['email'];
    $password = $_POST['password'];


     // Prepare SQL query to find the user by email
    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = mysqli_query($conn, $sql);


    // Check if a user with this email exists
    if(mysqli_num_rows($result) == 1){
        // Fetch the user data as an associative array
        $row = mysqli_fetch_assoc($result);


         // Verify the entered password with the hashed password in the database
        if(password_verify($password, $row['password'])){

        // Store user information in session variables
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['role'] = $row['role'];

            
             // Redirect user based on their role with a success alert
            if($row['role'] == 'Admin'){
                echo "<script>
                        alert('Login Successful! Welcome Admin.');
                        window.location.href='index.html';
                      </script>";
            } else {
                echo "<script>
                        alert('Login Successful! Welcome User.');
                        window.location.href='home.html';
                      </script>";
            }
            exit();

        } else {
            // Password is incorrect
            echo "<script>
                    alert('Incorrect Password!');
                    window.history.back();
                  </script>";
        }

    } else {
        // Email not found in database
        echo "<script>
                alert('User not found!');
                window.history.back();
              </script>";
    }
}
?>