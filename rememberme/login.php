<?php
session_start();
$conn = new mysqli('localhost', 'root', '', 'menu') or die(mysqli_error());

if (isset($_COOKIE["userID"])&&isset($_COOKIE["password"]))
{
   header("Location:welcome.php");
}

if(isset($_POST["submit"])){
 $sql = "SELECT * FROM users WHERE userID = '".$_POST["name"]. "' AND password = '" .$_POST["pass"]."'";
 $query = mysqli_query($conn, $sql);
 $res = mysqli_fetch_assoc($query);
 if($res)
 {
 if(!empty($_POST["remember"]))
 {
 setcookie ("userID", $_POST["name"], time() + (10 * 24 * 60 * 60));
 setcookie ("password", $_POST["pass"], time() + (10  * 24 * 60 * 60));
 header("Location:welcome.php");
 }
 else
 {
   header("Location:welcome.php");
 }
 }
 else
 {
 $msg = "Invalid Username or Password";
 }
}

?>
<!doctype html>
<html>
<head>
<title>Login</title>
</head>
<body>
<form action="" method="post" >
<label>Username</label>
<input type="text" name="name"/><br/><br/>
<label>Password</label>
<input type="password" name="pass"/><br/><br/>
<input type="checkbox" name="remember"/>
<label>Remember me</label><br/><br/>
<input type="submit" name="submit" value="Login">
<p><?php if(isset($msg)) {echo $msg;} ?></p>

</form>
</body>
</html>