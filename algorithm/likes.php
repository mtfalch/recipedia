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

    //Predefine valid to false
    $object -> valid = 'F';

    $query = mysqli_query($con, $sql) or die("Failed: " . mysqli_error());
    echo mysqli_fetch_array($query)['cnt'];
    exit();
    if(mysqli_fetch_array($query)['cnt'] != 1){
        // $object -> res = mysqli_fetch_array($query)['cnt'];
        // echo json_encode($object);
        exit();
    }

    //Usser validated, set valid to true
    $object -> valid = 'T';

    //Fetch dishID and like from POST for processing
    $dishID = $_POST['dishID'];
    $like = (int) $_POST['like'];

    $sql = "SELECT likes from likes_list where userID = '$userID' and dishID = '$dishID'";
    $query = mysqli_query($con, $sql) or die("Failed: " . mysqli_error());
    $rows = mysqli_fetch_array($query);

    //Initialise currentLike
    $currentLike = 0;

    if(mysqli_num_rows($query) == 1){
        //When user already have liked or disliked
        $previousLike = $rows['likes'];
        $currentLike = $previousLike;
        if($like != $previousLike)
            $currentLike += $like * 3;

    }else{
        
        $currentLike = $like;
        $sql = "INSERT into likes_list (userID, dishID, likes) values ($userID, $dishID, $currentLike)";
        $query = mysqli_query($con, $sql) or die("Failed: " . mysqli_error());

    }

    if($currentLike = 0){

        $sql = "DELETE from likes_list where userID = '$userID' and dishID = '$dishID";
        $query = mysqli_query($con, $sql) or die("Failed: " . mysqli_error());
        $object -> status = $currentLike;

    }else{

        $sql = "UPDATE likes_list set likes = $currentLike where userID = '$userID' and dishID = '$dishID";
        $query = mysqli_query($con, $sql) or die("Failed: " . mysqli_error());
        $object -> status = $currentLike / 3;

    }

    echo json_encode($object);

    exit();
?>