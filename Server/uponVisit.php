<?php
header("Access-Control-Allow-Origin: http://localhost:8000");
    include 'session.php';

    //If cookie of name is found
    // if (isset($_COOKIE[$cookie_name]))
    // {

    // }

    $cookie_name = "visit_time";
    $cookie_value = time();
    setcookie($cookie_name, $cookie_value, time() + (86400 * 7), "/"); // cookie lasts for 7 days

?>