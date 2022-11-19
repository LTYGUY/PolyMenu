<?php
$host = "localhost";
$user = "X34468377";
$passwd = "X34468377";
$dbname = "X34468377";

$dbc = mysqli_connect($host, $user, $passwd, $dbname) or die('Error connection' . mysql_error());

if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: "
  . mysqli_connect_error()
  . "<br/>Error number:"
  . mysql_connect_errno();
}

mysqli_select_db($dbc, $dbname);
?>