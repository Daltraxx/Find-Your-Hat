"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hole = 'O';
const hat = '^';
const findPathToHat = (startingPoint, gameMap, visitedPositions = [startingPoint]) => {
    let foundHat = false;
    for (let edge of startingPoint.edges) {
        let neighborPosition = edge.end.data.split('-');
        let rowPosition = Number(neighborPosition[0]);
        let colPosition = Number(neighborPosition[1]);
        if (gameMap[rowPosition][colPosition] === hat) {
            return true;
        }
        if (gameMap[rowPosition][colPosition] === hole)
            startingPoint.removeEdge(edge.end);
    }
    startingPoint.edges.forEach((edge) => {
        const neighbor = edge.end;
        if (!visitedPositions.includes(neighbor)) {
            visitedPositions.push(neighbor);
            foundHat = findPathToHat(neighbor, gameMap, visitedPositions);
        }
    });
    return foundHat;
};
/* For testing
const testField = [
    ['!', 'O', 'O'],
    ['░', '░', '░'],
    ['O', '^', '░'],
]
mapGameGrid(testField);
const startingPoint = gameGraph.getVertexByValue(getPositionString([0, 0]));
console.log(findPathToHat(startingPoint, testField));
*/
exports.default = findPathToHat;
