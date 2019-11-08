<?php

    error_reporting(E_ERROR | E_PARSE);
    $serverName = "localhost";
    $serverUserName = "root";
    $serverPassword = "";
    $serverDatabase = "menu";

    $userID = mysqli_real_escape_string($_POST['userID']);

    $con = mysqli_connect($serverName, $serverUserName, $serverPassword, $serverDatabase);
    if(!$con)
        die("MYSQL Connection Error: " . mysqli_connect_error());
    
    //UserID Validation, only a registered user can perform like operations
    $sql = "SELECT count(*) as cnt from users where userID = '$userID'";

    $query = mysqli_query($con, $sql) or die("Failed: " . mysqli_error());
    if(mysqli_fetch_array($query)['cnt'] != 1){
        $obj->userIDValid = "F";
        echo json_encode($obj);
        exit();
    }

    $dishID = $_POST['dishID'];
    $like = (int) $_POST['like'];
    $sql = "SELECT likes from likes_list where userID = '$userID' and dishID = '$dishID'";
    $query = mysqli_query($con, $sql) or die("Failed: " . mysqli_error());
    $rows = mysqli_fetch_array($query);
    $obj->userIDValid = "T";
    if(mysqli_num_rows($query) == 1){
        if($rows['likes'] != $like){
            //likeStatus:
            //  0: No Change
            //  1: Change
            //  2: Error
            //increment the popularity of the dish by $like * 3
            $delta = $like * 3;
            $sql = "UPDATE dish_info set popularity = popularity";
            if($like > 0)
                $sql .= "+";
            else
                $sql .= "-";
            $sql .= "$delta where dishID = $dishID";
            $query = mysqli_query($con, $sql) or die("Failed: " . mysqli_error());
            
            $obj->likeStatus = 1;
        }else
            $obj->likeStatus = 0;
        exit();
    }else
        $obj->likeStatus = 2;
    echo json_encode($obj);
    exit();
?>