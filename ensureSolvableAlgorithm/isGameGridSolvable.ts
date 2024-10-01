import mapGameGrid from "./mapGameGrid";
import getPositionString from "./getPositionString";
import findPathToHat from "./findPathToHat";


const isGameGridSolvable = (gameGrid, playerPosition) => {
    const gameGraph = mapGameGrid(gameGrid);
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