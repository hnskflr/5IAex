const socket = io.connect();

socket.on('setSymbol', symbol => {
    document.querySelector('#symbol').innerHTML = 'Sie spielen als ' + symbol + '.';
});

socket.on('refresh', (board, toMove, result) => {
    board.forEach( (el, ix) => {
        document.querySelector('#f' + ix).innerHTML = el;
    });
    if (result === '') {
        document.querySelector('#toMove').innerHTML = 'Am Zug: ' + toMove + '.';
    } else {
        document.querySelector('#toMove').innerHTML = 'Gewinner: ' + result + '.';
    }
});

socket.on('msg', data => {
    document.querySelector('#msg').innerHTML = data;
});

(() => {
  const $ = document.querySelector.bind(document);

  [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach( (i) => {
    $("#f" + i).addEventListener("click", () => { socket.emit('move', i); } );
  });

})();
