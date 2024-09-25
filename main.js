"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompt = require('prompt-sync')({ sigint: true });
const { Field } = require('./FieldClass');
let findYourHatGame = new Field([
    ['!', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);
findYourHatGame.playGame();
