<?php
  require_once __DIR__ . "/../globals.php";
  require_once __DIR__ . "/../model/User.php";

  $data = User::getUserByUsername("mikewright");

  include("partials/header.php");
  include("partials/indexpartial.php");
  include("partials/footer.php");
?>
