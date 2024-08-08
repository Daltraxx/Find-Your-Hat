//to get around ts block-scoped variable bug
export {};
const prompt = require('prompt-sync')({sigint: true});
const { Field } = require('./FieldClass');


let defineYourOwnField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
  ]);



let gameStarted : boolean = false;

while (gameStarted === false) {
    let answer : string | null = prompt('Enter "1" to use a Field in this file or "2" to start generating a new field. >> ');
    switch (answer) {
        case '1':
            gameStarted = true;
            defineYourOwnField.playGame();
            break;
        case '2':
            gameStarted = true;
            let customGame = new Field();
            customGame.playGame();
            break;
        default:
            console.log('Invalid entry.');
    }
}
