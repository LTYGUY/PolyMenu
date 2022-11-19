<?php
    $productID = $_REQUEST["removeFromCart"];

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

      if (array_key_exists($productID, $cookie_value))
        $cookie_value[$productID]['amount'] -= 1;

      if ($cookie_value[$productID]['amount'] == 0)
          unset($cookie_value[$productID]);

    setcookie($cookie_name, json_encode($cookie_value), time() + (86400 * 1)); // cookie lasts for 1 day

    echo json_encode($cookie_value);
?>