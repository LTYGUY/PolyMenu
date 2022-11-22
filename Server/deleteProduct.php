<?php

include 'connectToDatabase.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') { 

    $data = file_get_contents( "php://input" );
    $data = json_decode($data);

    $productID= $data->productID;

    $query = "DELETE FROM Product WHERE productID='$productID'";
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