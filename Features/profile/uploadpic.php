<!DOCTYPE html>
<html>
  <head>
    <title></title>
  </head>
  <body>
    <?php
    //cho "hi";
    $target_dir = "web/";
    $target_file = $target_dir . basename($_FILES["file"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    // Check if image file is a actual image or fake image
    if(isset($_POST["upload"])) {
        $check = getimagesize($_FILES["file"]["tmp_name"]);
        if($check !== false) {
            echo "The file is an image - " . $check["mime"] . ".<br>";
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
    } else {
        if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
            echo "The file ". basename( $_FILES["file"]["name"]). " has been uploaded. <br>";
            //upload the pic to database
            $link = mysqli_connect("localhost", "root", "", "menu");
              if ($link->connect_error) {
                die("Connection failed: " . $link->connect_error);
              }
            //$upload_sql = "UPDATE users SET pic ='".$target_file."'WHERE userID='".$name."'";
              $upload_sql = "UPDATE users SET pic ='".$target_file."'WHERE userID='aaa'";

              if (mysqli_query($link,$upload_sql)) {
                   echo "New record created successfully";
               } else {
                   echo "Error: " . $link->error;
               }
               //$link->close();
            //show the pic
            ?>
            <img src = '<?php echo $target_file; ?>' style="width:200px;height:120px;object-fit:cover;" >

            <?php
        } else {
            echo "Sorry, there was an error uploading your file.<br>";
        }
    }
    ?>
  </body>
</html>
