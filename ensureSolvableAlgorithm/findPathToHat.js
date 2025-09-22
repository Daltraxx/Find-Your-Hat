"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hole = 'O';
var hat = '^';
var findPathToHat = function (startingPoint, gameMap, visitedPositions) {
    if (visitedPositions === void 0) { visitedPositions = [startingPoint]; }
    var foundHat = false;
    for (var _i = 0, _a = startingPoint.edges; _i < _a.length; _i++) {
        var edge = _a[_i];
        var neighborPosition = edge.end.data.split('-');
        var rowPosition = Number(neighborPosition[0]);
        var colPosition = Number(neighborPosition[1]);
        if (gameMap[rowPosition][colPosition] === hat) {
            return true;
        }
        if (gameMap[rowPosition][colPosition] === hole)
            startingPoint.removeEdge(edge.end);
    }
    startingPoint.edges.forEach(function (edge) {
        var neighbor = edge.end;
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
