//to get around ts block-scoped variable bug
export {};
const { Field } = require('./FieldClass');


let game = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);

let customGame = new Field();

customGame.playGame();