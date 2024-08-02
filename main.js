const Field = require('./FieldClass');


let game = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

let biggerGame = new Field();

biggerGame.playGame();
