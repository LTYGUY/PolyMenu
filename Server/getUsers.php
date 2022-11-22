<?php
    include 'connectToDatabase.php';
    if ($_SERVER['REQUEST_METHOD'] === 'GET') { 
    session_start();

    $now = time();
    if($now > $_SESSION['expireLogin']) {
        session_destroy();
        die('fail');
    }

    $username = $_SESSION['username'];
    $token = $_SESSION['token'];

    $query = "SELECT * FROM User WHERE userName = '$username' AND token = '$token'";

    $result = mysqli_query($dbc, $query);

    if (!$result) {
        printf("The query failed\n");
        printf("Error message: %s",
        $mysqli->error);
    }

    while($row=mysqli_fetch_object($result)){
        echo json_encode($row);
    }

    mysqli_free_result ($result);
    mysqli_close($dbc);
}
?>