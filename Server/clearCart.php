<?php
header("Access-Control-Allow-Origin: http://localhost:8000");
$cookie_name = "cart_productIDs";

$cookie_value;

setcookie($cookie_name, $cookie_value, time() - 10000);
?>