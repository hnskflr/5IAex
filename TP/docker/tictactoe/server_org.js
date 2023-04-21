"use strict";

let express = require('express');
let server = express();
server.use(express.static('public'));

let http = require('http');
let webServer = http.Server(server);
let socketIo = require('socket.io');
let io = socketIo(webServer);

let gameModule = require('./gamemodule.js');

// merkt sich die Sockets der Spieler ('X' und 'O')
let player = { 'X': null, 'O': null };

// ein neues Spiel: wer beginnt, wird zufaellig ausgewaehlt
let game = new gameModule.Game('XO'.charAt(2 * Math.random()));

// Client-Zaehler
let num = 0;

io.on('connection', socket => {

  num = num + 1;

  if (num === 1) {

    // der erste Spieler: dieser Socket ist player.X...
    player.X = socket;

    // ... und muss noch warten
    player.X.emit('msg', 'Bitte warten Sie auf Ihren Gegner!');

  } else if (num === 2) {

    // der zweite Spieler: dieser Socket ist player.O...
    player.O = socket;

    // ... und es kann los gehen
    Object.keys(player).forEach( (el) => {
      player[el].emit('msg', 'Spiel eroeffnet!');
      player[el].emit('setSymbol', el);
      player[el].on('move', ix => {
        let res = game.move(el, ix);
        player[el].emit('msg', res);
        io.emit('refresh', game.board, game.toMove, game.result);
      });
    });

    io.emit('refresh', game.board, game.toMove, game.result);

  } else {

    // mehr als 2 Spieler verwalten wir leider nicht :(
    socket.emit('msg', 'Sorry, es waren bereits genug Spieler online.');
  }

});

webServer.listen(9000, '0.0.0.0');
