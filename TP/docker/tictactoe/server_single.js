"use strict";

const express = require('express');
const app = express();
app.use(express.static('public'));
const http = require('http');
const webServer = http.Server(app);
const socketIo = require('socket.io');
const io = socketIo(webServer);

const gameModule = require('./gamemodule.js');

// merkt sich die Sockets der Spieler ('X' und 'O')
const player = { 'X': null, 'O': null };
const players = [];

// ein neues Spiel: wer beginnt, wird zufaellig ausgewaehlt
const game = new gameModule.Game('XO'.charAt(2 * Math.random()));

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

const server = webServer.listen(9000, () => {
    const host = server.address().address
    const port = server.address().port
    console.log('Users app listening at http://%s:%s', host, port)
})
