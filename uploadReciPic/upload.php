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
      <label>Enter at most 3 ingredients:</label><br><br>
      Ingredient 1: <input type="text" name="in1" id="in1">
      Type of Ingredient: <input type="text" name="intype1" id="intype1"><br><br>
      Ingredient 2: <input type="text" name="in2" id="in2">
      Type of Ingredient: <input type="text" name="intype2" id="intype2"><br><br>
      Ingredient 3: <input type="text" name="in3" id="in3">
      Type of Ingredient: <input type="text" name="intype3" id="intype3">
      </p>
      Select image to upload:
      <input type="file" name="fileToUpload" id="fileToUpload">
      <input type="submit" value="Upload" name="submit">
    </form>
  </body>
</html>
