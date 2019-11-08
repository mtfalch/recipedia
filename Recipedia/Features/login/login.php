<!DOCTYPE html>
<html>
<head>
	<title>Login Page</title>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
	<div id ="frm">
		<form action="setCookie.php" method="POST">
				<label>Username: </label>
				<input type="text" id ="userID" name="user"><br>
				<label>Password: </label>
				<input type="text" id ="password" name="password"><br>
				<input type="submit" name="btn" value="Login"><br>
			    <span style="color:blue" onclick ="window.location = 'http://192.168.64.2/recipedia /mainpage'"> Remember me</span>
			
		</form>
	</div>
</body>
</html>
