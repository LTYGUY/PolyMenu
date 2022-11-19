<?php
    $cookie_name = "cart_productIDs";

    $cookie_value;

    //If cookie of name is found
    if (isset($_COOKIE[$cookie_name]))
    {
        $cookie_value = json_decode($_COOKIE[$cookie_name], true);
    }
    else
    {
        $cookie_value = array();
    }

    include 'connectToDatabase.php';

    //Please include the real values here thanks
    $userId = 1;
    $timeFormat = (date("jS F Y h:ia"));
    $query = "";

    foreach($cookie_value as $cartItem)
    {
        for ($i = 0; $i < $cartItem->amount; $i)
        {
            $query .= "INSERT INTO Record VALUES ($cartItem->product['productID'],'$userId','$timeFormat');";
        }
    }

    $result = mysqli_query($dbc, $query);
            
    if (!$result) {
        printf("The query failed\n");
        printf("Error message: %s",
        $mysqli->error);
        echo 'fail';
        return;
    }

    $nr = mysqli_num_rows($result);

    echo 'success';
?>