<?php
    include 'connectToDatabase.php';

    $query = "SELECT * FROM User;";

    $result = mysqli_query($dbc, $query);

    if (!$result) {
        printf("The query failed\n");
        printf("Error message: %s",
        $mysqli->error);
    }

    while($row=mysqli_fetch_object($result)){
        echo json_encode($row);
    }
?>