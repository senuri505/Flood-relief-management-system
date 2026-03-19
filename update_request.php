<?php

// Include the database connection file
include 'db_connect.php';

// Check if the form was submitted using the POST method
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get the ID of the record to update and cast it to an integer
    $id = (int)$_POST['id'];

        // Sanitize and get all the form input values to prevent SQL injection
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


        // Prepare the SQL UPDATE query to modify the existing record
    $sql = "UPDATE relief_requests SET
        relief_type='$relief_type',
        district='$district',
        divisional_secretariat='$divisional_secretariat',
        gn_division='$gn_division',
        contact_person='$contact_person',
        contact_number='$contact_number',
        address='$address',
        family_members=$family_members,
        severity_level='$severity_level',
        special_needs='$special_needs'
        WHERE id=$id";


    // Execute the query and check if it was successful
    if($conn->query($sql)===TRUE){
                // If successful, show an alert and redirect to 'my_requests.php'
        echo "<script>
            alert('Request Updated Successfully');
            window.location='my_requests.php';
        </script>";
    } else {
                // If there is an error, display it
        echo "Error: ".$conn->error;
    }
    $conn->close();
}
?>