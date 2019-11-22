<?php

    error_reporting(E_ERROR | E_PARSE);
    $serverName = "localhost";
    $serverUserName = "root";
    $serverPassword = "";
    $serverDatabase = "menu";

    $userID = $_POST['userID'];

    $con = mysqli_connect($serverName, $serverUserName, $serverPassword, $serverDatabase);
    if(!$con)
        die("MYSQL Connection Error: " . mysqli_connect_error());

    //UserID Validation, only a registered user can perform like operations
    $sql = "SELECT count(*) as cnt from users where userID = '$userID'";

    //Predefine valid to false
    $object -> valid = 'F';

    $query = mysqli_query($con, $sql) or die("Failed at userID validation...");
    if(mysqli_fetch_array($query)['cnt'] != 1){
        echo json_encode($object);
        exit();
    }

    //Usser validated, set valid to true
    $object -> valid = 'T';

    $tags = explode(',', $_POST['tags']);

    $sql = 
        "SELECT distinct dish_info.dishID, dish_info.dishName, dish_info.imgscr from dish_info, tag_join_dish where ";

    $or = false;
    foreach($tags as $tag){
        if(!$or){
            $or = true;
        }else
            $sql .= " or ";
        $sql .= "tag_join_dish.tagName = " . "'$tag'";
    }

    // $tagsLength = count($tags);
    // for($i = 0; $i < $tagsLength; $i++){
    //     $tag = $tags[i];
    //     $sql .= " tag_join_dish.tagName = " . "'$tag'";
    //     if($i != $tags.length - 1)
    //         $sql .= " or";
    // }

    $sql .= " order by dish_info.popularity desc";

    $query = mysqli_query($con, $sql) or die("Failed at search process...");

    $list = array();
    while($row = mysqli_fetch_assoc($query)){
        $elem = null;
        $elem -> dishID = $row['dishID'];
        $elem -> dishName = $row['dishName'];
        $elem -> imgUrl = $row['imgscr'];
        array_push($list, $elem);
    }

    foreach($list as $item){
        $dishID = $item -> dishID;
        $sql = "SELECT likes from likes_list where userID = '$userID' and dishID = $dishID";
        $query = mysqli_query($con, $sql) or die(mysqli_error($con));
        $like = 0;
        if(mysqli_num_rows($query) != 0)
            $like = (int) mysqli_fetch_array($query)['likes'];
        $item -> like = $like;
    }

    $object -> list = $list;

    echo json_encode($object);

?>