<?php
    include 'connectToDatabase.php';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') { 

        $data = file_get_contents( "php://input" );
        $data = json_decode($data);

        $IMAGE = "image/default.jpg";

        $itemName = $data->itemName;
        $category = $data->category;
        $itemCode = $data->itemCode;
        $price = $data->price;

       // Hash password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $query = "INSERT INTO Product values (null,'$itemName','$category','$itemCode','$price','$IMAGE',0,'')";
        $success = mysqli_query($dbc, $query);

        if($success)
        {
            echo 'success';
        }else {
            printf("The query failed\n");
            printf("Error message: %s", $mysqli->error);
        }
        mysqli_close($dbc);
 

    }

?>