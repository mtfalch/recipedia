<?php

$link = mysqli_connect("localhost", "root", "", "recipedia");
  if ($link->connect_error) {
    die("Connection failed: " . $link->connect_error);
  }

$cate = "select DISTINCT category from dish_info";
$result = $link->query($cate);
$result->data_seek(0);
while($row = $result->fetch_assoc())
{
  $que = "Select max(total),dishName, category
          from (SELECT SUM(likes) as 'total', dishName, category from likes_list, dish_info
          where likes_list.dishID = dish_info.dishID and category = '".$row['category']."'
           group by likes_list.dishID) as pop";
          $result1 = $link->query($que);
          $result1->data_seek(0);
          while($row1 = $result1->fetch_assoc())
          {
            echo $row['category'].": ".$row1['dishName'].", No of likes = ".$row1['max(total)']."<br>";
          }
}

 ?>
