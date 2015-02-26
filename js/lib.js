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
    function extendObject(obj) {
      if (typeof obj === "undefined") {
        obj = document;
      }

      obj.isArray = obj instanceof Array || obj instanceof HTMLCollection;

      if (!obj.setText) {
        obj.setText = function(msg) {

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

          if (obj.isArray) {
            obj.forEach(assignText);
          } else {
            assignText(obj);
          }
        }
      }

      if (!obj.ready) {
        obj.ready = function(func) {
          if (document.readyState === "complete") {
            func();
          } else {
            window.addEventListener('load', func);
          }

          return function() {
            window.removeEventListener('load', func);
          }
        }
      }

      if (!obj.addClick) {
        obj.addClick = function(func) {

          function applyOnClick(i) {
            i.addEventListener('click', func);
          }

          if (obj.isArray) {
            obj.forEach(applyOnClick);
          } else {
            applyOnClick(obj);
          }
        }
      }

      return obj;
    };

    var lib = function(arg) {
      if (typeof arg === "undefined") {
        return extendObject(document);
      } else if (typeof arg !== "string") {
        return extendObject(arg);
      } else {
        var elements = document.querySelectorAll(arg);
        if (elements.length === 0) {
          elements = document.getElementById(arg);
        }

        return extendObject(elements);
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
