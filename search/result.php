<?php

  //$name = $_POST['find'];
  $name = $_GET['find'];
  //$dish_ID = 0;
  //echo "hi <br>";
  //echo "The result related to ".$name;
  //to prevent mysql injecttion
	//$name = stripcslashes($name);

  //connect to the server and select database
	$link = mysqli_connect("localhost", "root", "", "login");

  //Query the database for dish_info
  $que_indre = "select dishName, `tag_join_dish`.tagName, `tag_join_dish`.dishID from tag_join_dish, tag_info, dish_info
                where `tag_info`.tagName = `tag_join_dish`.tagName
                and `tag_join_dish`.dishID = `dish_info`.dishID and dishName  = '".$name."'";

  $result = $link->query($que_indre);

  if(!$result) die("No information");

  $result->data_seek(0);
  echo "The following are the ingredients of ".$name. ":<br>";
  while($row = $result->fetch_assoc())
  {
    echo $row['tagName']."<br>";
  }
 ?>
