var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var fs = require('fs');
var path = require('path');

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

app.use(cookieParser());
app.get('/', function(req, res) {
  console.log('Index request');
  res.redirect('/overview.html');
});

app.get('/login', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.cookie('username', 'login');
  res.send('ok');
});

app.get('/logout', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.clearCookie('username');
  res.send('ok');
});

app.get('/reset', function(req, res) {
  var initialValue = {
    boardSize: 8,
    pieces: {
      x: 2,
      y: 2
    }
  };
  res.cookie('gameBoard', initialValue);
  res.send('ok');
});

app.get('/cache.manifest', function(req, res) {
  var filePath = path.join(__dirname, 'cache.manifest');
  var readStream = fs.createReadStream(filePath);
  res.header('Content-Type', 'text/cache-manifest');
  readStream.pipe(res);
});

app.use(express.static(__dirname));

server.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server is listening at http://%s:%s', host, port);
});
