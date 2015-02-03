'use strict';

function pageInit() {
  document.getElementById('runTest').onclick = runTest;
  
}

function runTest() {
  $('title').setText('msg');
  $('.blah').setText('inDiv');
}

function $(val) {
  if (arguments.length === 0) {
    return document;
  }

  if (typeof val !== "string") {
    return document;
  }

  var obj = {};
  // We are passing a class
  if (val.indexOf('.') === 0) {
    obj.raw = document.getElementsByClassName(val.substring(1));
    obj.setText = function(msg) {
      for (var i = 0; i < this.raw.length; ++i) {
        var item = this.raw[i];
        item.innerText = msg;
      }
    }
  } else {
    obj.raw = document.getElementById(val);
    obj.setText = function(msg) {
      this.raw.innerText = msg;
    }
  }
  return obj;
}

function ourConcat(intArray) {
  if (typeof intArray === "undefined" && arguments.length === 0) {
    return [];
  }

  if (!(intArray instanceof Array)) {
    var original = intArray;
    intArray = new Array();
    intArray.push(original);
  }

  for (var i = 1; i < arguments.length; ++i) {
    if (arguments[i] instanceof Array) {
      var x = arguments[i];
      for (var y = 0; y < x.length; ++y) {
        intArray.push(x[y]);
      }
    } else {
      intArray.push(arguments[i]);
    }
  }

  return intArray;
}

if (window && document) {
  window.onload = pageInit;
}
