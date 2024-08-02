const Field = require('./FieldClass');


let game = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

let biggerGame = new Field(Field.generateField(10, 20, 20));

biggerGame.playGame();
