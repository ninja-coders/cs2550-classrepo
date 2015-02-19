'use strict';

// This is to create a shim for the code if the io service doesn't exist
if (!io) {
  window.io = { connect: function() {
    return {
      emit: function() { },
      on: function() { },
      disconnect: function() { }
    };
  }};
}

//
//
// ChatModel
//
//
var ChatModel = (function() {
  var CHAT_SERVER = 'localhost:3000';

  function ChatModel() {
    this.$$messageEvents = [];
  }

  ChatModel.prototype.$init = function() {};

  ChatModel.prototype.$registerMessageEvent = function(callback) {
    this.$$messageEvents.push(callback);
    var self = this;
    return function() {
      var index = self.$$messageEvents.indexOf(callback);
      if (index >= 0) {
        self.$$messageEvents.splice(index, 1);
      }
    };
  };

  ChatModel.prototype.$connect = function(name) {
    if (this.$$socket) {
      return;
    }

    this.$$name = name;
    this.$$socket = io.connect(CHAT_SERVER);
    this.$$socket.emit('username', { username: this.$$name });

    var self = this;
    this.$$socket.on('newuser', function(data) {
      console.log('Received new user: ' + JSON.stringify(data));
      self.$$userConnected(data);
    });
    this.$$socket.on('newmessage', function(data) {
      console.log('Received new data: ' + JSON.stringify(data));
      self.$$messageReceived(data);
    });
  };

  ChatModel.prototype.$sendMessage = function(message) {
    var chatData = { username: this.$$name, message: message };
    this.$$socket.emit('message', chatData);
    this.$$triggerMessageEvent(chatData);
  };

  ChatModel.prototype.$$triggerMessageEvent = function(data) {
    var message = data.username + ': ' + data.message;
    for (var i = 0; i < this.$$messageEvents.length; ++i) {
      var nextCallback = this.$$messageEvents[i];
      if (nextCallback && typeof nextCallback === 'function') {
        try {
          nextCallback(message);
        } catch (e) {
          console.error('failed to fire callback');
        }
      }
    }
  };

  ChatModel.prototype.$$userConnected = function(data) {
    data.message = 'New User';
    this.$$triggerMessageEvent(data);
  };

  ChatModel.prototype.$$messageReceived = function(data) {
    this.$$triggerMessageEvent(data);
  };

  ChatModel.prototype.$disconnect = function() {
    if (!this.$$socket) {
      return
    }

    this.$$socket.disconnect();
    delete this.$$socket;
  };

  return ChatModel;
})();

//
//
// ChatController
//
//
var ChatController = (function() {
  function ChatController(view, model) {
    this.$$view = view || new ChatView();
    this.$$model = model || new ChatModel();
  }

  ChatController.prototype.$init = function() {
    this.$$view.$init();
    this.$$model.$init();

    var self = this;
    this.$$view.$registerEventListener(function(event, data) {
      self.$$viewEventReceived(event, data);
    });

    this.$$model.$registerMessageEvent(function(msg) {
      self.$$newMessageReceived(msg);
    });
  };

  ChatController.prototype.$$newMessageReceived = function(message) {
    this.$$view.$addMessage(message);
  };

  ChatController.prototype.$$viewEventReceived = function(event, data) {
    if (event === 'connect') {
      this.$$model.$connect(data.username);
    } else if (event === 'message') {
      this.$$model.$sendMessage(data.message);
    }
  };

  return ChatController;
})();


//
//
// ChatView
//
//
var ChatView = (function() {
  function ChatView() {
    this.$$eventListeners = [];
  };

  ChatView.prototype.$registerEventListener = function(callback) {
    this.$$eventListeners.push(callback);
    var self = this;
    return function() {
      var index = self.$$eventListeners.indexOf(callback);
      if (index >= 0) {
        self.$$messageEvents.splice(index, 1);
      }
    };
  };

  ChatView.prototype.$$notifyEventListeners = function(event, data) {
    for (var i = 0; i < this.$$eventListeners.length; ++i) {
      var callback = this.$$eventListeners[i];
      if (callback && typeof callback === 'function') {
        try {
          callback(event, data);
        } catch (e) {
          console.error('Error in ChatView callback: %s', e);
        }
      }
    }
  };

  ChatView.prototype.$init = function() {
    console.log('View init');
    this.$$chatWindow = $('chatWindow');
    this.$$toggleButton = $('chatToggle');
    this.$$connectButton = $('chatConnect');
    this.$$usernameText = $('username');
    this.$$newMessageText = $('newMessage');
    this.$$sendMessageButton = $('sendMessage');
    this.$$messageBox = $('chatMessages');

    this.$$chatDisplayed = false;

    var self = this;
    this.$$toggleButton.addClick(function() {
      console.log('Here');
      self.$$chatWindow.style.display = self.$$chatDisplayed ? 'none' : 'block';
      self.$$chatDisplayed = !self.$$chatDisplayed;
    });

    this.$$connectButton.addClick(function() {
      self.$$notifyEventListeners('connect', {username: self.$$usernameText.value });
      self.$$sendMessageButton.disabled = false;
    });

    this.$$sendMessageButton.addClick(function() {
      self.$$notifyEventListeners('message', {message: self.$$newMessageText.value });
      self.$$newMessageText.value = '';
      self.$$newMessageText.focus();
    });
  };

  ChatView.prototype.$addMessage = function(message) {
    var textNode = document.createTextNode(message);
    var breakNode = document.createElement('br');

    this.$$messageBox.appendChild(textNode);
    this.$$messageBox.appendChild(breakNode);
    this.$$messageBox.scrollTop = this.$$messageBox.scrollHeight;
  };

  return ChatView;
})();

$().ready(function() {
  var controller = new ChatController();
  controller.$init();
})
