var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/public'));

server.listen(port, function() {
    console.log('Server listening on port %d', port);
});

io.on('connection', function(socket) {
    console.log('A user connected');

    socket.on('disconnect', function() {
        console.log('A user disconnected');
    });
});

