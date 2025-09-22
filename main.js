"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prompt = require('prompt-sync')({ sigint: true });
var Field = require('./FieldClass').Field;
var findYourHatGame = new Field([
    ['!', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);
findYourHatGame.playGame();
