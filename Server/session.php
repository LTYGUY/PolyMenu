<?php
//ref:https://www.php.net/manual/en/function.session-create-id.php

function my_session_start(){
session.start();

$_SESSION['sessionid'] = session_create_id();
if (!empty($_SESSION['newest_time']) && $_SESSION['newest_time'] < time() - 6000){
    session_destroy();
    session_start();
}
}

function my_session_regenerate_id(){

    if (session_status() != PHP_SESSION_ACTIVE){
        session_start();
    }

$newid = session_create_id('PolyMenu');

$_SESSION['newest_time'] = time();

session_commit();

ini_set('session.use_strict_mode', 0);

session_id($newid);

session_start();
}

ini_set('session.use_strict_mode', 1);
my_session_start();

//my_session_regenerate_id();


echo json_encode($allProducts);
?>