<?php
    error_reporting(E_ERROR | E_PARSE);
    $serverName = "localhost";
    $serverUserName = "root";
    $serverPassword = "";

    $con = mysqli_connect($serverName, $serverUserName, $serverPassword);
    mysqli_select_db($con, "menu");

    $userID = $_POST["email"];
    $password = $_POST["password"];

    $sql = "INSERT into users (userID,password,pic) values ('$userID','$password','')";
    mysqli_query($con, $sql) or die("Failed: " . mysqli_error());

    $obj -> status = "SUCCESS";
    $json = json_encode($obj);
    echo $json;
?>