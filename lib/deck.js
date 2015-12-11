'use strict';

function Deck() {
    this.cards = [];
    var ranks = [ '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2' ];
    var suits = [ 'D', 'C', 'H', 'S' ];
    for (var i = 0; i < ranks.length; i++) {
        for (var j = 0; j < suits.length; j++) {
            var l = this.cards.length;
            this.cards[l] = new Deck.card(ranks[i], suits[j]);
        }
    }
    this.shuffle();
}

Deck.prototype.shuffle = function() {
    var l = this.cards.length;
    for (var i = 0; i < l; i++) {
        var r = Math.floor(Math.random() * l);
        var temp = this.cards[i];
        this.cards[i] = this.cards[r];
        this.cards[r] = temp;
    }
};

Deck.prototype.count = function() {
    return this.cards.length;
};

Deck.prototype.draw = function() {
    return this.cards.length > 0 ? this.cards.pop() : null;
};

Deck.prototype.compareCards = function(a, b) {
    if (a.rank == b.rank) {
        // diamonds < clubs < hearts < spades
        if (a.suit == b.suit) return 0;
        if (a.suit == 'S') return 1;
        if (b.suit == 'S') return -1;
        if (a.suit == 'H') return 1;
        if (b.suit == 'H') return -1;
        if (a.suit == 'C') return 1;
        if (b.suit == 'C') return -1;
        if (a.suit == 'D') return 1;
        if (b.suit == 'D') return -1;
        throw new Error('Unrecognized suit.');
    }
    if (a.rank == '2') return 1;
    if (b.rank == '2') return -1;
    if (a.rank == 'A') return 1;
    if (b.rank == 'A') return -1;
    if (a.rank == 'K') return 1;
    if (b.rank == 'K') return -1;
    if (a.rank == 'Q') return 1;
    if (b.rank == 'Q') return -1;
    if (a.rank == 'J') return 1;
    if (b.rank == 'J') return -1;
    return parseInt(a.rank) - parseInt(b.rank);
};

Deck.card = function(rank, suit) {
    this.rank = rank;
    this.suit = suit;
};

Deck.card.prototype.toString = function() {
    return this.rank + this.suit;
};

module.exports = Deck;
