"use strict";

let gameModule = require('./gamemodule.js');

let expect = (test, res1, res2) => {
  if (res1 !== res2) {
    console.log('Fehler in Test ' + test);
    console.log('erhalten: "' + res1 + '"');
    console.log('erwartet: "' + res2 + '"');
    process.exit(1);
  }
};

let game = new gameModule.Game('X');
expect( 1, game.move('X', 0), '');
expect( 2, game.move('X', 0), 'Ungueltiger Zug: X ist nicht am Zug!');
expect( 3, game.move('O', 2), '');
expect( 4, game.move('X', 2), 'Ungueltiger Zug: Feld 2 ist nicht frei!');
expect( 5, game.move('X', 4), '');
expect( 6, game.move('O', 8), '');
expect( 7, game.move('X', 3), '');
expect( 8, game.move('O', 5), '');
expect( 9, game.move('X', 6), 'Ungueltiger Zug: das Spiel ist zu Ende');
expect(10, game.result, 'O'); // O gewinnt

game = new gameModule.Game('O');
expect(11, game.move('O', 0), '');
expect(12, game.move('X', 1), '');
expect(13, game.move('O', 2), '');
expect(14, game.move('X', 4), '');
expect(15, game.move('O', 7), '');
expect(16, game.move('X', 3), '');
expect(17, game.move('O', 5), '');
expect(18, game.move('X', 8), '');
expect(17, game.move('O', 6), '');
expect(19, game.result, '-'); // unentschieden

console.log('Test OK');
