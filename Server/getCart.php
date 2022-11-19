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

    $toArray = array();
    foreach($cookie_value as $value)
    {
        $toArray[] = $value;
    }

    echo json_encode($toArray);
?>