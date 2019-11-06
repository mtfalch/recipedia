<!DOCTYPE html>
<html>
  <head>
    <title></title>
  </head>
  <body>
    <h1>Create new recipes</h1>
    <form action="receive.php" method="post" enctype="multipart/form-data">
      <p>
      <label>Dish Name:</label>
      <input type="text" name="dishName" id="dishName">
      </p>
      <p>
      <label>Enter at most 3 ingredients:</label>
      <input type="text" name="in1" id="in1">
      <input type="text" name="in2" id="in2">
      <input type="text" name="in3" id="in3">
      </p>
      Select image to upload:
      <input type="file" name="fileToUpload" id="fileToUpload">
      <input type="submit" value="Upload" name="submit">
    </form>
  </body>
</html>
