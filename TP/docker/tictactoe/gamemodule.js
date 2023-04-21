"use strict";

/* class Game

   eine ES2015 Klasse mit der Business Logic des Spiels Tic-Tac-Toe

   ( https://de.wikipedia.org/wiki/Tic-Tac-Toe )

*/

class Game {

    /* constructor:
       initialisiert ein neues Spiel wobei firstMove beginnen soll

       firstMove ist 'X' oder 'O' (default 'X')

    */

    constructor(firstMove) {

        /* das Spielfeld wird als Array mit 9 Elementen abgelegt:
             0  1  2
             3  4  5
             6  7  8
           jedes Element enthaelt eines der Zeichen ' ', 'X' oder 'O'
        */

        this.board = ['', '', '',
                      '', '', '',
                      '', '', ''];

        /* wer ist am Zug? 'X' oder 'O' */

        if (firstMove !== 'X' && firstMove !== 'O') {
            firstMove = 'X';
        }
        this.toMove = firstMove;

        /* Ergebnis: ''  -> Spiel laeuft
                     'X' -> 'X' hat gewonnen
                     'O' -> 'O' hat gewonnen
                     '-' -> unentschieden
        */

        this.result = '';

    }

    /* ermittle ob das gegebene Symbol ('X' oder 'O') gewonnen hat
       (es muessen alle 8 moeglichen Reihen ueberprueft werden)

       liefert true oder false zurueck

    */

    boardHasWinner(symbol) {
        let symbol3 = symbol + symbol + symbol;
        if (this.board[0] + this.board[1] + this.board[2] === symbol3 ||
            this.board[3] + this.board[4] + this.board[5] === symbol3 ||
            this.board[6] + this.board[7] + this.board[8] === symbol3 ||
            this.board[0] + this.board[3] + this.board[6] === symbol3 ||
            this.board[1] + this.board[4] + this.board[7] === symbol3 ||
            this.board[2] + this.board[5] + this.board[8] === symbol3 ||
            this.board[0] + this.board[4] + this.board[8] === symbol3 ||
            this.board[2] + this.board[4] + this.board[6] === symbol3) {
            return true;
        }
        return false;
    }

    /* ermittle ob alle Felder belegt sind

       liefert true oder false zurueck
    */

    boardIsFull() {
        if (this.board.join('').length === 9) {
            return true;
        }
        return false;
    }


    /* fuehre einen Zug aus

       liefert eine Fehlermeldung zurueck (falls der Zug ungueltig ist) oder
       einen leeren String (falls der Zug ausgefuerhrt wurde)
    */

    move(symbol, field) {

        /* fange zunaechst Fehler ab */

        if (this.result !== '') {
            return 'Ungueltiger Zug: das Spiel ist zu Ende';
        }

        if (symbol !== this.toMove) {
            return 'Ungueltiger Zug: ' + symbol + ' ist nicht am Zug!';
        }

        if (this.board[field] !== '') {
            return 'Ungueltiger Zug: Feld ' + field + ' ist nicht frei!';
        }

        /* fuehre den Zug aus */

        this.board[field] = symbol;
        if (symbol === 'X') {
            this.toMove = 'O';
        } else {
            this.toMove = 'X';
        }

        /* war das der Siegerzug? oder gibt es Unentschieden? */

        if (this.boardHasWinner(symbol)) {
            this.result = symbol;
        } else if (this.boardIsFull()) {
            this.result = '-';
        }

        return '';

    }

}

exports.Game = Game;
