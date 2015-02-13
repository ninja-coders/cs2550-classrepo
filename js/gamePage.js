'use strict';

var chatWindow;

function generateChat(parentElement) {
  //<div id="chatWindow"></div>
  //<div class="message">
  //  <input type="text" id="nextMessage" class="messageBox"></input>
  //  <button id="sendMessage">Send</button>
  //</div>

  var parentWrapper = document.createElement("div");
  parentWrapper = parentElement.appendChild(parentWrapper);

  var chatWindow = document.createElement("div");
  chatWindow.id = "newchatwindow";
  var messageWindow = document.createElement("div");
  parentWrapper.appendChild(chatWindow);
  parentWrapper.appendChild(messageWindow);


  var input = document.createElement("input");
  var button = document.createElement("button");
  button.id = "sendMessage";
  button.appendChild(document.createTextNode("send"));
  messageWindow.appendChild(input);
  messageWindow.appendChild(button);

  return parentWrapper;
};

function openChatWindow() {
  //var popup = window.open("chat.html", "Chat Window", "height=300,width=250,screenX=100,screenY=200,resizeable=no");
  var chatDiv = document.getElementById('chatDiv');
  chatWindow = generateChat(chatDiv);
  $('startChat').click(closeChatWindow);
}

function closeChatWindow() {
  var chatDiv = document.getElementById('chatDiv');
  chatDiv.removeChild(chatWindow);
  $('startChat').click(openChatWindow);
}

$().ready(function() {
  $('startChat').click(openChatWindow);
});
