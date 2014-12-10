var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// EXPRESS ROUTE HANDLER
// .get gets an Express application setting
// request and response are the node objects
// with additional stuff added by Express
app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html');
});

// Setting up static files with Express
app.use('/styles', express.static(__dirname + '/styles'));

// Notify when an IO connection is accomplished
io.on('connection', function(socket){
  console.log('a user connected');

  // Notify when an IO connection is terminated
  socket.on('disconnect', function(){
    console.log('a user disconnected');
  });

  // Emit message to every when chat message is received
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

// Fire up a local server
http.listen(3000, function(){
  console.log('listening on *:3000');
});
