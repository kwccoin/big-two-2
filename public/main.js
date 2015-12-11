'use strict';

$(document).ready(function() {
    var socket = io();
    $('#usernameInput').focus();

    function addPlayer() {
        var username = $('#usernameInput').val().trim();
        if (username) {
            $('.login.page').fadeOut();
            $('.game.page').show();
            $('#chatInput').focus();
            socket.emit('add player', username);
        }
    }

    function addChatMessage(message) {
        var el = $('<li>').text(message);
        var m = $('.messages');
        m.append(el);
        m.scrollTop(m.prop('scrollHeight'));
    }

    function sendMessage() {
        var message = $('#chatInput').val();
        if (message) {
            $('#chatInput').val('');
            addChatMessage(message);
            socket.emit('chat message', message);
        }
    }

    $(document).keypress(function(e) {
        if (e.which == 13) {
            if ($('.login.page').is(':visible')) {
                addPlayer();
            } else {
                sendMessage();
            }
        }
    });

    socket.on('chat message', function(message) {
        addChatMessage(message);
    });


    function addCard(card) {
        var div = $('<div class="card">');
        var suitChar = "\u00a0";
        switch (card.suit) {
            case "C" :
                suitChar = "\u2663";
                break;
            case "D" :
                div.addClass('red');
                suitChar = "\u2666";
                break;
            case "H" :
                div.addClass('red');
                suitChar = "\u2665";
                break;
            case "S" :
                suitChar = "\u2660";
                break;
        }
        div.text(card.rank + suitChar);

        $('#card-area').append(div);
    }

    socket.on('deal hand', function(hand) {
        for (var i = 0; i < hand.length; i++) {
            addCard(hand[i]);
        }
        $('#card-area').sortable({
            containment:'parent',
            cursor:'move',
            delay:100,
            placeholder:'placeholder',
            revert:200
        });
    });

});