<?php
	// //get value pass from form in the login.php file
	$username = $_POST['user'];
	$password = $_POST['password'];

	// //to prevent mysql injecttion
	$username= stripcslashes($username);
	$password= stripcslashes($password);
	// //$username=mysql_real_escape_string($username);
	// //$password=mysql_real_escape_string($password);

	// //connect to the server and select database
	$link=mysqli_connect("localhost", "root", "");
	mysqli_select_db($link,"login");

	// //Query the database for user
	$result=mysqli_query($link,"select * from users where username = '$username' and password = '$password' ")
	or die("Failed to query database".mysql_error());
	$row = mysqli_fetch_array($result);
	if($row['username'] == $username&& $row['password']==$password){
	echo "Login successful";
	}
	else{
		echo "Failed";
	}
?>