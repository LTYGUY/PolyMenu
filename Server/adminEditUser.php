<?php

include 'connectToDatabase.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') { 

    $data = file_get_contents( "php://input" );
    $data = json_decode($data);

    $userId = $data->userId;
    $name = $data->name;
    $email = $data->email;
    $address = $data->address;
    $phone = $data->phone;

    $query = "UPDATE User SET name = '$name', email='$email', phone='$phone', userAddress= '$address' WHERE userId='$userId'";
    $success = mysqli_query($dbc, $query);

    if ($success)
        {
            echo 'success';
        }
        else
        {
            echo 'fail';
        }

        mysqli_free_result ($result);
    mysqli_close($dbc);
    } 
        else {
            printf("The query failed\n");
            printf("Error message: %s", $mysqli->error);
        }
    
?>