<?php

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    include 'connectToDatabase.php';
    session_start();

    $userId = $_SESSION['userId'];

    $query = "SELECT * FROM Record WHERE userID = '$userId'";

    $result = mysqli_query($dbc, $query);

    if (!$result) {
        printf("The query failed\n");
        printf("Error message: %s",
        $mysqli->error);
    }

    $resultData = array();
    while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
        array_push($resultData,$row);
    }

    echo json_encode($resultData);

    mysqli_free_result ($result);
    mysqli_close($dbc);
}
?>