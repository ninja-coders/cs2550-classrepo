var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

io.on('connection', function(socket) {
  console.log('New socket connected');
  socket.on('username', function(user) {
    socket.broadcast.emit('newuser', user);
  });
  socket.on('message', function(message) {
    socket.broadcast.emit('newmessage', message);
  });
  socket.on('disconnect', function() {
    console.log('Socket has disconnected');
  })
});

app.get('/', function(req, res) {
  console.log('Index request');
  res.redirect('/overview.html');
});

app.get('/test', function(req, rest) {

  res.end();
});

app.use(express.static(__dirname));
app.use(express.cookieParser());

server.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server is listening at http://%s:%s', host, port);
});
