var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/public'));

server.listen(port, function() {
    console.log('Server listening on port %d', port);
});

var numPlayers = 0;
var Deck = require('./lib/deck.js');
var deck = new Deck();

io.on('connection', function(socket) {
    console.log('A user connected');

    socket.on('disconnect', function() {
        console.log('A user disconnected');
    });

    socket.on('add player', function(username) {
        console.log('Adding player: ' + username);
        socket.username = username;
        numPlayers++;
        // broadcast join message

        // create a hand
        var hand = [];
        for (var i = 0; i < 13; i++) {
            hand.push(deck.draw());
        }

        // sort the hand
        hand.sort(deck.compareCards);

        // attach to the socket
        socket.hand = hand;

        // send the hand to the player
        socket.emit('deal hand', hand);
    });

    socket.on('chat message', function(message) {
        socket.broadcast.emit('chat message', message);
    });
});

