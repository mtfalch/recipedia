<?php
    error_reporting(E_ERROR | E_PARSE);
    $serverName = "localhost";
    $serverUserName = "root";
    $serverPassword = "";
    $serverDatabase = "menu";

    $con = mysqli_connect($serverName, $serverUserName, $serverPassword, $serverDatabase);

    $userID = $_POST["email"];
    $password = $_POST["password"];

    $sql = "INSERT into users (username, password) values ('$userID','$password')";
    mysqli_query($con, $sql) or die("Failed: " . mysqli_error());

    $obj -> status = "SUCCESS";
    $json = json_encode($obj);
    echo $json;
?>