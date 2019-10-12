<!DOCTYPE html>
<html>
<head>
	<title>Login Page</title>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
	<div id ="frm">
		<form action="setCookie.php" method="POST">
			<p>
				<label>Username: </label>
				<input type="text" id ="user" name="user">
			</p>
			<p>
				<label>Password: </label>
				<input type="text" id ="password" name="password">
			</p>
			<p>
				<input type="submit" name="btn" value="Login">
			</p>
		</form>
	</div>
</body>
</html>
