<?php
    error_reporting(E_ERROR | E_PARSE);
    $serverName = "localhost";
    $serverUserName = "root";
    $serverPassword = "";

    $con = mysqli_connect($serverName, $serverUserName, $serverPassword);
    mysqli_select_db($con, "menu");

    //$userID = mysqli_real_escape_string($_POST["email"]);
    $password = mysqli_real_escape_string($_POST["password"]);

    $sql = "UPDATE users SET password ='".$password."'WHERE userID='aaa'";
    //$sql = "UPDATE users SET password ='".$password."'WHERE userID='".$userID."'";
    mysqli_query($con, $sql) or die("Failed: " . mysqli_error());

    echo "Change password sucessfully!";
    /*$obj -> status = "Change password sucessfully!";
    $json = json_encode($obj);
    echo $json;?*/
?>
