<?php
$cookie_name = "cart_productIDs";

$cookie_value;

setcookie($cookie_name, $cookie_value, time() - 10000);
?>