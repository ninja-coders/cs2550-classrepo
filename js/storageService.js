'use strict';

var StorageService = (function() {
  var DATA_STORE = 'data';
  var KEY_STORE = 'keys';

  function StorageService(namespace) {
    this.$$namespace = namespace;
    this.$$store = localStorage;
  }

  StorageService.prototype.$$get = function(key) {
    var value = this.$$store[key];
    if (typeof value !== 'undefined') {
      return JSON.parse(this.$$store[key]);
    } else {
      return undefined;
    }
  }

  StorageService.prototype.$$set = function(key, value) {
    this.$$store[key] = JSON.stringify(value);
  };

  StorageService.prototype.init = function() {
    this.$$loadKeys();
  };

  StorageService.prototype.$$keyName = function(key) {
    return this.$$namespace + '.' + DATA_STORE + '.' + key;
  };

  StorageService.prototype.$$loadKeys = function() {
    this.$$keys = this.$$get(this.$$namespace + '.' + KEY_STORE) || [];
  };

  StorageService.prototype.$$saveKeys = function() {
    this.$$set(this.$$namespace + '.' + KEY_STORE, this.$$keys);
  }

  StorageService.prototype.getItem = function(key) {
    return this.$$get(this.$$keyName(key));
  };

  StorageService.prototype.setItem = function(key, value) {
    if (!this.exists(key)) {
      this.$$keys.push(key);
      this.$$saveKeys();
    }
    return this.$$set(this.$$keyName(key), value);
  };

  StorageService.prototype.exists = function(key) {
    return typeof this.$$get(this.$$keyName(key)) !== "undefined";
  };

  StorageService.prototype.reset = function() {
    this.$$store.clear();
  };

  StorageService.prototype.getKeys = function() {
    return this.$$keys;
  }

  return StorageService;
})();
