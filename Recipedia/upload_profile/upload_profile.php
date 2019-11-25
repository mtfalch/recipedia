<?php
    session_start();
    $user=$_SESSION["user"];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $age = $_POST['age'];
    $prefer_category = $_POST['prefer_category'];
    $target_dir = "web/";
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

    $link = mysqli_connect("localhost", "root", "", "menu");
      if ($link->connect_error) {
        die("Connection failed: " . $link->connect_error);
      }

    // Check if image file is a actual image or fake image
    if(isset($_POST["submit"])) {
        $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
        if($check !== false) {
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
        if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
            echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded. <br>";
            //upload the pic to database
            $link = mysqli_connect("localhost", "root", "", "menu");
              if ($link->connect_error) {
                die("Connection failed: " . $link->connect_error);
              }
                //$upload_sql = "UPDATE users SET pic ='".$target_file."'WHERE userID='".$name."'";
                $upload_sql = "UPDATE users SET pic ='".$target_file."'WHERE userID='bbb'";

              if (mysqli_query($link,$upload_sql)) {
                   echo "New record created successfully";
                   $uploadOk = 1;
               } else {
                   echo "Error: " . $link->error;
               }
               //$link->close();
            //show the pic
            ?>
            <img src = '<?php echo $target_file; ?>' >

            <?php
        } else {
            echo "Sorry, there was an error uploading your file.<br>";
        }
    }

    if($uploadOk == 1){
        $sql_tag_info_1 = "UPDATE users SET 
        first_name = '".$first_name."', last_name = '".$last_name."', age = '".$age."' , prefer_category = '".$prefer_category."'
        WHERE userID='".$user."'";
        mysqli_query($link,$sql_tag_info_1);
    }  
?>