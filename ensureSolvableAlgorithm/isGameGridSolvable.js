const { gameGraph, getPositionString, mapGameGrid, findPathToHat } = require('./findPathToHat');

const isGameGridSolvable = (gameGrid, playerPosition) => {
    mapGameGrid(gameGrid);
    const startingPoint = gameGraph.getVertexByValue(getPositionString(playerPosition));

    return findPathToHat(startingPoint, gameGrid);
}

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