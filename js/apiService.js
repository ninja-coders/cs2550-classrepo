'use strict';

var ApiService = (function() {
  var AUTHORIZATION_KEY = 'eTreqSHAtSmshy4IXKHp2klOs1s4p11YAJejsnXd1WH5L0L27l';
  var YODA_ENDPOINT = 'https://yoda.p.mashape.com/yoda?sentence=';
  var WEATHER_ENDPOINT = 'https://george-vustrey-weather.p.mashape.com/api.php?location=';

  function ApiService() {
    this.$$store = new StorageService('api');
    this.$$store.init();
  }

  ApiService.prototype.$$createRequest = function(success, error, key) {
    var self = this;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState !== 4) {
         return;
      }

      if (request.status >= 200 && request.status < 300) {
        if (success) {
          self.$$store.setItem(key, request.responseText);
          success(request.responseText);
        } else {
          console.log(request.responseText);
        }
      } else {
        if (error) {
          error(request.status, request.responseText);
        } else {
          console.warn(request.responseText);
        }
      }
    };
    return request;
  };

  ApiService.prototype.yodaText = function(sentence, successCallback) {
    if (this.$$store.exists(sentence)) {
      successCallback(this.$$store.getItem(sentence));
      return;
    } else {
      var request = this.$$createRequest(successCallback, undefined, sentence);
      request.open('GET', YODA_ENDPOINT + window.encodeURI(sentence));
      request.setRequestHeader('Accept', 'text/plain');
      request.setRequestHeader('X-Mashape-Key', AUTHORIZATION_KEY);
      request.send();
    }
  };

  ApiService.prototype.weatherService = function(location, successCallback, errorCallback) {
    var request = this.$$createRequest(successCallback, errorCallback);
    request.open('GET', WEATHER_ENDPOINT + location);
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('X-Mashape-Key', AUTHORIZATION_KEY);
    request.send();
  }

  ApiService.prototype.requestBin = function(data) {
    var request = this.$$createRequest();
    request.open('POST', 'http://requestb.in/11nlt171');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(data);
  }

  ApiService.prototype.testAjax = function() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://www.google.com');
    setTimeout(function() {
      if (request) {
        request.abort();
        console.log('We are aborting');
      }
    }, 5000);

    request.onreadystatechanged = function() {
      console.log('Here: ' + request);
    };
    request.send();
  };

  return ApiService;

})();
