'use strict';

var app = angular.module("myApp", []);

app.controller("appController", function($scope) {
  $scope.Title = "Welcome Angular";
  $scope.hideCount = true;
  $scope.count = 0;

  $scope.sayHi = function() {
    $scope.count++;
    if ($scope.count > 10 && $scope.count <= 20) {
      $scope.hideCount = false;
      $scope.Response = "This is getting old";
    } else if ($scope.count > 20) {
      $scope.Response = "Leave me alone";
    } else {
      $scope.Response = "Well Hello";
    }
  }
});
