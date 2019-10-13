<?php
    error_reporting(E_ERROR | E_PARSE);
    $serverName = "localhost";
    $serverUserName = "root";
    $serverPassword = "";

    $con = mysqli_connect($serverName, $serverUserName, $serverPassword);
    mysqli_select_db($con, "recipedia");

    $userID = mysql_real_escape_string($_POST["email"]);
    $password = mysql_real_escape_string($_POST["password"]);

    $sql = "INSERT into users (email, password) values ('$userID','$password')";
    mysqli_query($con, $sql) or die("Failed: " . mysqli_error());

    $obj -> status = "SUCCESS";
    $json = json_encode($obj);
    echo $json;

?>