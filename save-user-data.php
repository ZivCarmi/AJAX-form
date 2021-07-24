<?php

if (!empty($_POST['name']) && !empty($_POST['email']) && !empty($_POST['phone']) && !empty($_POST['type'])) {

  $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
  $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
  $phone = filter_var($_POST['phone'], FILTER_SANITIZE_STRING);
  $type = filter_var($_POST['type'], FILTER_SANITIZE_STRING);
  $phoneRegExp = "/^0[2-9]\d{7,8}$/";
  $type_options = ['basic', 'business', 'free'];

  if (mb_strlen($name) > 2 && mb_strlen($name) < 70) {

    if ($email) {

      if (preg_match($phoneRegExp, $phone)) {

        if (in_array($type, $type_options)) {

          $dbcon = 'mysql:host=localhost;dbname=landing_page;charset=utf8';
          $db = new PDO($dbcon, 'root', '');
          $sql = "INSERT INTO users VALUES(null, ?, ?, ?, ?, NOW())";
          $query = $db->prepare($sql);

          if ($query->execute([$name, $email, $phone, $type])) {

            echo true;
          }
        }
      }
    }
  }
}
