"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapGameGrid_1 = require("./mapGameGrid");
const getPositionString_1 = require("./getPositionString");
const findPathToHat_1 = require("./findPathToHat");
const isGameGridSolvable = (gameGrid, playerPosition) => {
    const gameGraph = (0, mapGameGrid_1.default)(gameGrid);
    const startingPoint = gameGraph.getVertexByValue((0, getPositionString_1.default)(playerPosition));
    return (0, findPathToHat_1.default)(startingPoint, gameGrid);
};
/* For testing
const testField = [
    ['!', 'O', 'O'],
    ['░', '░', '░'],
    ['O', '^', '░'],
]
const playerPosition = [0, 0];
console.log(isGameGridSolvable(testField, playerPosition));
*/
module.exports.isGameGridSolvable = isGameGridSolvable;
