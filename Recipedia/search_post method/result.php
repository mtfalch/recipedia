<!DOCTYPE html>
<?php
  $name = $_POST['find'];

  //find the no. of search
  $no_of_search = 1;
 ?>
<html lang="en">
<head>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

      <title>Result of <?php echo "$name"; ?></title>
      <!-- Optional JavaScipt -->
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
              integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
              crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
              integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
              crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
              integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
              crossorigin="anonymous"></script>
<style>
  .search_result{
      top: 500px;
      left: 250px;
  }


</style>
</head>

<body>
  <!-- Main body -->
  <!-- Navigation bar -->
  <nav class="navbar navbar-expand-sm bg-light navbar-light fixed-top mx-auto" style="width: 1000px;">
      <div class="container-fluid">

          <!-- Buttons -->
          <ul class="navbar-nav">
              <li class="nav-item active">
                  <a class="navbar-brand" href="../mainpage/mainpage.html"><img src="../img/logo.png" height="30" width="100"></a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="../profile/profile.html">Profile</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="../sign_up/sign_up.html">Sign up</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="../login/login.html">Login</a>
              </li>
          </ul>

          <!-- Search function -->
          <form class="form-inline" action="../search/result.php" method = "post">
              <input class="form-control mr-sm-2" type="text" placeholder="Search" name = "find">
              <button class="btn btn-success" type="submit">Search</button>
          </form>
      </div>
  </nav>
        <div class="search_result">
          <br><br><br>
        <?php
            //to prevent mysql injecttion
    	      //$name = stripcslashes($name);

            //connect to the server and select database
    	       $link = mysqli_connect("localhost", "root", "", "menu");

             //gen no. of tagName
             for ($i = 0; $i < $no_of_search; $i++)
             {
               //need to change $name
                if($i == 0)
                {
                  $tagName = "`tag_join_dish`.tagName  = '".$name."'";
                }
                //need to change $name
                else {
                  $tagName += " or `tag_join_dish`.tagName  = '".$name."'";
                }
             }

             //Query the database for dish_info
             $que_dish = "select DISTINCT dishName, imgscr, `tag_join_dish`.tagName, `tag_join_dish`.dishID
                          from tag_join_dish, tag_info, dish_info,likes_list
                          where `tag_info`.tagName = `tag_join_dish`.tagName
                          and `tag_join_dish`.dishID = `dish_info`.dishID
                          and dish_info.dishID = likes_list.dishID
                          and (".$tagName.")
                          group by dishID";

              $result = $link->query($que_dish);

              if(!$result) die("<ul>No information related to ".$name."</ul>");

              $result->data_seek(0);

              echo "<ul>The following are the dishes of ".$name. ":<br>";
              while($row = $result->fetch_assoc())
              {
                echo $row['dishName']."<br>";
                echo "<img src='../".$row['imgscr']."' alt='' style='width:200px; height: 120px; object-fit: cover;'><br>";
                ?>
              <?php } ?>

            </ul>
      </div>
</body>
</html>
