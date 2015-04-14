'use strict';

//$(document).ready(function() {
//$(function() {});

function addNumbers() {
  var element1 = $("#num1");
  var element2 = $("#num2");

  //console.log(document.getElementById("num1").value);
  //console.log(element1.val());

  var result = parseInt(element1.val()) + parseInt(element2.val());

  $("#calculatedValue").text(result);
}

$(function() {
  $("#add").click(addNumbers);
  $("form").submit(function() { return false; });

  setTimeout(function() {
    $("h1").not("#mainTitle").addClass("subtitle")//.css("font-size", "12pt")
      .first().html("A New Title").css("color", "red").end()
      .last().css("color", "blue");

    var newTitle = $("<h1 />").html("New Section").addClass("subtitle");
    //var newTitle = $("h1").last().clone().html("New Section");

    newTitle.insertAfter($("h1").last());
    newTitle.attr("link", "Hello");
    newTitle.attr({
      name: "fred",
      date: "today",
      link: function(idx, link) {
        return link + " Mr. Wright";
      }
    });

  }, 1000);
});


function MyPrototype(text) {
  this.$$text = text;
}

MyPrototype.prototype.handleClick = function() {
  console.log(this.$$text);
  $("#mainTitle").hide(1000);
};

$(function() {
  var myObject = new MyPrototype("Mike");
  $("#testMe").click($.proxy(myObject, "handleClick"));
});
