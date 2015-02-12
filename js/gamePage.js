'use strict';

$().ready(function() {
  $('startChat').click(function() {
    var popup = window.open("chat.html", "Chat Window", "height=300,width=250,screenX=100,screenY=200,resizeable=no");
  });
});
