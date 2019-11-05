<!DOCTYPE html>
<html>
  <head>
    <title></title>
  </head>
  <body>
    <label>Username:</label> <span> <?php echo "cat"; //$name=$_POST['user'] ?></span>
    <form id="myForm" name ="myForm" method="post" enctype="multipart/form-data">
      Select image to upload:
      <input type="file" name="file" id="file" />
      <button type="button" id="upload" name="upload">Upload</button>
    </form>

    <form method="post">
      <label>Change Password:</label><br>
      <label>Input password</label>
      <input id="input-password" type="password" /><br>
      <label>Input password again</label>
      <input id="input-password-repeat" type="password" />
      <button type="button" id="changepw" >Change</button>
    </form>
    <div id="dispinfo"></div>

    <script>
      //<input type="button" value="upload" onclick="uploadInfo()" />

      var button_uploadpic = document.getElementById('upload');
      var form_file = document.getElementById('myForm');
      var pic_file = document.getElementById('file');

      //pasword
      var input_password = document.getElementById('input-password');
      var input_password_repeat = document.getElementById('input-password-repeat');
      var button_changepw = document.getElementById('changepw');
      var password_valid = false;

      function AJAXPost(url, formData){
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function(){
              if(this.readyState == 4 && this.status == 200)
                dispinfo.innerHTML = this.responseText;
          }
          xhr.open('POST', url, true);
          xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
          xhr.send(formData);
      }

      button_uploadpic.onclick = function(){
        
        var url = 'uploadpic.php';
        //var file = pic_file.file;
        var formData = 'file='+pic_file.value;
        //formData.append('file', file, file.name);
        AJAXPost(url, formData);
      }

      button_changepw.onclick = function(){
        if(input_password.value != input_password_repeat.value)
        {
            //password_validate_warning.classList.remove('retract');
            password_valid = false;
            dispinfo.innerHTML="This password is not correct";
        }else{
            password_validate_warning.classList.add('retract');
            password_valid = true;
        }

        if(password_valid)
        {
          var url = 'changepw.php';
          var formData = new FormData();
          formData.append('password', input_password.value);
          AJAXPost(url, formData);
        }
      }

    </script>
  </body>
</html>
