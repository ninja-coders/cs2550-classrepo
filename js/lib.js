'use strict';

// Lets create our own library
var _cs2550_lib = (function() {
  function extendBuiltInObjects() {
    if (typeof String.prototype.trim === 'undefined') {
      String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
      }
    }
  }

  function generateLib() {
    function Library(item) {
      if (typeof item === "undefined") {
        item = document;
      }
      this.item = item;
      this.isArray = item instanceof Array || item instanceof HTMLCollection;
    }
    Library.prototype.setText = function(msg) {
      if (typeof msg !== "string") {
        console.warn('Trying to use setText without string');
        return;
      }

      function assignText(i) {
        if (i.innerText) {
          i.innerText = msg;
        } else if (i.textContent) {
          i.textContext = msg;
        } else if (i.value) {
          i.value = msg;
        } else {
          console.warn('Attempted to write text to element that does not support it');
        }
      }

      if (this.isArray) {
        for (var i = 0; i < this.item.length; ++i) {
          assignText(this.item[i]);
        }
      } else {
        assignText(this.item);
      }
    };

    Library.prototype.ready = function(func) {
      if (window.onload) {
        var original = window.onload;
        window.onload = function() {
          original();
          func();
        }
      } else {
        window.onload = func;
      }
    };

    var lib = function(arg) {
      if (typeof arg === "undefined") {
        return new Library();
      } else if (typeof arg !== "string") {
        return new Library(arg);
      } else {
        if (arg.indexOf('.') == 0) {
          return new Library(document.getElementsByClassName(arg.substring(1)));
        } else {
          return new Library(document.getElementById(arg));
        }
      }
    };
    return lib;
  };

  extendBuiltInObjects();
  return generateLib();
})();

if (typeof $ === 'undefined' && window) {
  window.$ = _cs2550_lib;
}
