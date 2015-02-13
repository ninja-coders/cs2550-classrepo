'use strict';

function Chat(name) {
  this.name = name;
  this.messages = [];
}


$().ready(function() {
  if (window) {
    window.onmessage = function(newMessage) {
      console.log(newMessage);
    };
  }
});
