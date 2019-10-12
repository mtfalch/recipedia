<?php
	//call cookie name
	//get value pass from form in the login.php file
	$username = $_COOKIE['userlogin'];
	$password = $_COOKIE['pw'];
	$countLogin = $_COOKIE['count'];

	//to prevent mysql injecttion
	$username= stripcslashes($username);
	$password= stripcslashes($password);
	$countLogin= stripcslashes($countLogin);
	//$username=mysql_real_escape_string($username);
	//$password=mysql_real_escape_string($password);

	//connect to the server and select database
	$link=mysqli_connect("localhost", "root", "");
	mysqli_select_db($link,"login");

	//Query the database for user //loginTimes = '$countLogin'
	$result=mysqli_query($link,"select * from users where username = '$username' and password = '$password' ")
		or die("Failed to query database".mysql_error());

	$row = mysqli_fetch_array($result);
	if($row['username'] == $username&& $row['password']==$password &&$username!=""){
		echo "Login successful<br>";
		if(!isset($username)) {
				echo "Cookie named '" . $username . "' is not set!";
				// if mysql exist $_SESSION['count'] information then $_SESSION['count'] = mysqlinfo
			} else if ($countLogin != NULL){
				echo "This is your ".$countLogin." times login <br>";
			}
	}
	else{
		echo "Failed";
	}
?>
