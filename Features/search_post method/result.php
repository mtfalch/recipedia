<?php

  $name = $_POST['find'];

  //to prevent mysql injecttion
	//$name = stripcslashes($name);

  //connect to the server and select database
	$link = mysqli_connect("localhost", "root", "", "menu");

  //Query the database for dish_info

  $que_dish = "select dishName, `tag_join_dish`.tagName, `tag_join_dish`.dishID, SUM(likes)
              from tag_join_dish, tag_info, dish_info, likes_list, users
              where `tag_info`.tagName = `tag_join_dish`.tagName
              and `tag_join_dish`.dishID = `dish_info`.dishID
              and `likes_list`.dishID = `dish_info`.dishID
              and `likes_list`.userID = `users`.userID
              and `tag_join_dish`.tagName = '".$name."'";

  /*$que_dish = "select dishName, `tag_join_dish`.tagName, `tag_join_dish`.dishID from tag_join_dish, tag_info, dish_info
                where `tag_info`.tagName = `tag_join_dish`.tagName
                and `tag_join_dish`.dishID = `dish_info`.dishID and `tag_join_dish`.tagName  = '".$name."'";*/
 /*
 $que_ing = "select dishName, `tag_join_dish`.tagName, `tag_join_dish`.dishID from tag_join_dish, tag_info, dish_info
               where `tag_info`.tagName = `tag_join_dish`.tagName
               and `tag_join_dish`.dishID = `dish_info`.dishID and dishName  = '".$name."'";
 */
  $result = $link->query($que_dish);

  if(!$result) die("No information related to dishes");

  if (mysqli_num_rows($result) > 0)
  {
      $result->data_seek(0);
      echo "The following are the dishes of ".$name. ":<br>";
      // output data of each row
      while($row = $result->fetch_assoc())
      {
        echo $row['dishName']." with no. of likes = ".$row['SUM(likes)']."<br>";
      }
  }
  else
  {
      echo "There are no results about ".$name.".";
  }
 ?>
