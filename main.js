"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Field } = require('./FieldClass');
let game = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);
let customGame = new Field();
customGame.playGame();
