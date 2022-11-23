<?php
header("Access-Control-Allow-Origin: http://localhost:8000");
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    include 'connectToDatabase.php';
    session_start();

    $userId = $_SESSION['userId'];

    $query = "SELECT Product.productID, Product.itemName, Record.orderdate FROM Record, Product WHERE Record.productID = Product.productID AND Record.userId = '$userId'";

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