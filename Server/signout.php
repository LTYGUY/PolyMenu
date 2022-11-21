<?php
include 'connectToDatabase.php';
    if ($_SERVER['REQUEST_METHOD'] === 'POST') { 

        $data = file_get_contents( "php://input" );
        $data = json_decode($data);
    
        $userId = $data->userId;

        $query = "UPDATE User SET token = '' WHERE userId='$userId'";
        $success = mysqli_query($dbc, $query);

        if ($success)
        {
            session_start();
            session_destroy();
            echo 'success';
        }
        else
        {
            echo 'fail';
        }
    }else {
        printf("The query failed\n");
        printf("Error message: %s", $mysqli->error);
    }
    
    mysqli_free_result ($result);
    mysqli_close($dbc);
    

?>