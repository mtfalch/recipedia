<?php
//set cookie
if(!isset($_COOKIE["userlogin"]))
{
  $cookie_count = 1;
  setcookie("userlogin",$_POST['userID'], time()+60*60*24);
  setcookie("count",$cookie_count, time()+60*60*24);
  header("Location:http://localhost/miniproject/process.php");
}
else {
  $cookie_count = ++$_COOKIE['count'];
  setcookie("count",$cookie_count, time()+60*60*24);
  header("Location:http://localhost/miniproject/process.php");
}
?>
