<!DOCTYPE html>
<html>
  <head>
    <title></title>
  </head>
  <body>
    <?php
    //$name = $_POST['user'];
      $dishname = $_POST['dishName'];
      $in1 = $_POST['in1'];
      $in2 = $_POST['in2'];
      $in3 = $_POST['in3'];
    //to prevent mysql injecttion
    //$name = stripcslashes($name);

    //connect databse
    $link = mysqli_connect("localhost", "root", "", "menu");
      if ($link->connect_error) {
        die("Connection failed: " . $link->connect_error);
      }

    //check dishes exist or not
    $havedish_que = "Select dishID, dishname, imgscr from dish_info where dishname ='".$dishname."'";
    $havedish_result = $link->query($havedish_que);
    $exist_flag = 0;
    while($row1 = $havedish_result->fetch_assoc())
    {
      if($row1['dishname'] != NULL)
      {
          if($row1['imgscr'] != NULL)
          {
              echo "There has been already existed a picture";
              exit;
          }
        $exist_dishID = $row1['dishID'];
        $exist_flag = 1;
      }
    }

    //handle dish name and ingredients
    //add new dishID by getting exist database info
    $exist_dish = "Select count(*) from dish_info";
    $exist_dish_result = $link->query($exist_dish);
    if(!$exist_dish_result) die("No information");
    $exist_dish_result->data_seek(0);

    while($row = $exist_dish_result->fetch_assoc())
    {
      $newDishID = $row['count(*)'];
    }
    $newDishID++;

    // for ingredients
    if($in2 == NULL)
    {
      $in2 = "NULL";
    }
    if($in3 == NULL)
    {
      $in3 = "NULL";
    }

    //upload pic
    $target_dir = "web/";
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    // Check if image file is a actual image or fake image
    if(isset($_POST["submit"])) {
        $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
        if($check !== false) {
            //echo "The file is an image - " . $check["mime"] . ".<br>";
            $uploadOk = 1;
        } else {
            echo "The file is not an image.<br>";
            $uploadOk = 0;
        }
    }
    // Allow certain file formats
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    && $imageFileType != "gif" ) {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.<br>";
        $uploadOk = 0;
    }
    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.<br>";
    // if everything is ok, try to upload file
    }
    else
    {
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file))
        {
            //upload the pic to database
              if($exist_flag == 1)
              {
                  $sql = "Update dish_info SET imgscr ='".$target_file."'WHERE dishID = ".$exist_dishID;
                  //$sql = "Update dish_info SET imgscr ='".$target_file."' WHERE dishID = 2";
              }
              else
              {
                  $sql = "insert INTO `dish_info`(`dishID`, `dishName`, `ingredients1`, `ingredients2`, `ingredients3`, `popularity`, `userID`, `imgscr`)
                          VALUES (".$newDishID.",'".$dishname."','".$in1."','".$in2."','".$in3."',0,'aaa','".$target_file."')";
              }
              if (mysqli_query($link,$sql))
              {
                   echo "Uploaded successfully<br>";
                   ?>
                   <img src = '<?php echo $target_file; ?>' style="width:200px; height: 120px; object-fit: cover;">
                   <?php
              }
              else
              {
                   echo "Error: " . $link->error;
               }
               //$link->close();
        }
        else
        {
            echo "Sorry, there was an error uploading your file.<br>";
        }
    }
    ?>
  </body>
</html>
