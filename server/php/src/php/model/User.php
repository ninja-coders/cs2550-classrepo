<?php

class User {
  public static function getUserByUsername($username) {
    $link = mysqli_connect('localhost', 'root', 'php') or die("Blah");
    $link->select_db("class-db");

    //$username = "mikewright'; DELETE * FROM User; SELECT * FROM User WHERE username = '"

    $result = $link->query("SELECT * FROM User WHERE username = '" . $username . "'");
    $data = $result->fetch_assoc();

    $link->close();

    return $data;
  }
}



?>
