<?php
header("Access-Control-Allow-Origin: http://localhost:8000");
    include 'connectToDatabase.php';
    if ($_SERVER['REQUEST_METHOD'] === 'GET') { 
    session_start();

    $now = time();
    if($now > $_SESSION['expireLogin']) {
        session_destroy();
        die('fail');
    }

    $query = "SELECT * FROM User";

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