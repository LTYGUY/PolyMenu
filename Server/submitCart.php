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
    session_start();
    $userId = $_SESSION['userId'];
    $timeFormat = (date("Y-m-d H:i:s"));
    $query = "";
    $firstQuery = 0;

    if($userId == '')
    {
        echo 'Plase sign in to make order.';
        return;
    }

    foreach($cookie_value as $cartItem)
    {
        $product = $cartItem['product'];
        $productID = $product['productID'];
        $amount = $cartItem['amount'];
        for ($i = 0; $i < $amount; $i++)
        {
            if ($firstQuery == 0)
            {
                $firstQuery++;
                $query .= "INSERT INTO Record VALUES (null,$productID,$userId,'$timeFormat')";
                continue;
            }
            $query .= ",(null,$productID,$userId,'$timeFormat')";
        }
        $result = mysqli_query($dbc, $query);
    }

    if ($query == "")
    {
        echo 'No orders!';
        return;
    }

    if (!$result) {
        printf($query);
        printf("The query failed\n");
        printf("Error message: %s", $mysqli->error);
        echo 'Order failed!';
        return;
    }

    echo 'success';
?>