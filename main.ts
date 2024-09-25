//to get around ts block-scoped variable bug
export {};
const prompt = require('prompt-sync')({sigint: true});
const { Field } = require('./FieldClass');


let findYourHatGame = new Field([
    ['!', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);



findYourHatGame.playGame();
