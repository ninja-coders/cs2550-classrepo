'use strict';

// Lets create our own library
var _cs2550_lib = (function() {
  function extendBuiltInObjects() {
    if (typeof String.prototype.trim === 'undefined') {
      String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
      }
    }

    if (typeof HTMLCollection.prototype.forEach === 'undefined') {
      HTMLCollection.prototype.forEach = function(func) {
        for (var i = 0; i < this.length; ++i) {
          func(this[i]);
        }
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
        if (typeof i.innerText === "string") {
          i.innerText = msg;
        } else if (typeof i.textContent === "string") {
          i.textContext = msg;
        } else if (typeof i.value === "string") {
          i.value = msg;
        } else {
          console.warn('Attempted to write text to element that does not support it');
        }
      }

      if (this.isArray) {
        this.item.forEach(assignText);
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
    Library.prototype.unload = function(func) {
      if (window.onunload) {
        var original = window.onunload;
        window.onunload = function() {
          var result = original();
          if (typeof result !== "undefined" && !result) {
            return result;
          }
          result = func();
          if (typeof result !== "undefined" && !result) {
            return result;
          }
        };
      } else {
        window.onunload = func;
      }
    };
    Library.prototype.leave = function(func) {
      window.onbeforeunload = func;
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
