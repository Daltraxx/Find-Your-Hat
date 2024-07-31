const Field = require('./FieldClass');


let game = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

game.playGame();
