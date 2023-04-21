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
const game = () => new gameModule.Game('XO'.charAt(2 * Math.random()));
const games = [];

// Client-Zaehler
let num = 0;

io.on('connection', socket => {

  const pair = Math.floor(num / 2)
  num = num + 1;

  if (num % 2 === 1) {

    players[pair] = Object.create(player);
    games[pair] = game();

    // der erste Spieler: dieser Socket ist player.X...
    players[pair].X = socket;

    // ... und muss noch warten
    players[pair].X.emit('msg', 'Bitte warten Sie auf Ihren Gegner!');

  } else if (num % 2 === 0) {

    // der zweite Spieler: dieser Socket ist player.O...
    players[pair].O = socket;

    // ... und es kann los gehen
    Object.keys(players[pair]).forEach( (el) => {
      players[pair][el].emit('msg', 'Spiel eroeffnet!');
      players[pair][el].emit('setSymbol', el);
      players[pair][el].on('move', ix => {
        let res = games[pair].move(el, ix);
        players[pair][el].emit('msg', res);
        Object.keys(players[pair]).forEach( (el) => players[pair][el].emit(
          'refresh', games[pair].board, games[pair].toMove, games[pair].result));
      });
      players[pair][el].emit('refresh', games[pair].board,
            games[pair].toMove, games[pair].result);
    });

  }

});

const server = webServer.listen(9000, () => {
    const host = server.address().address
    const port = server.address().port
    console.log('Users app listening at http://%s:%s', host, port)
})
