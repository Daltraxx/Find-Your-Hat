"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FieldClass_js_1 = require("../FieldClass.js");
var isGameGridSolvable = function (gameGrid, playerPosition) {
    var gridHeight = gameGrid.length;
    var gridWidth = gameGrid[0].length;
    var seen = new Array(gridHeight);
    for (var i = 0; i < seen.length; i++) {
        seen[i] = new Array(gridWidth);
        seen[i].fill(false);
    }
    seen[playerPosition[0]][playerPosition[1]] = true;
    var isValidPosition = function (row, col) {
        return row >= 0 && row < gridHeight && col >= 0 && col < gridWidth;
    };
    var directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    var stack = [playerPosition];
    while (stack.length) {
        var position = stack.pop();
        if (!position)
            continue;
        var rowPosition = position[0], colPosition = position[1];
        for (var _i = 0, directions_1 = directions; _i < directions_1.length; _i++) {
            var _a = directions_1[_i], xMovement = _a[0], yMovement = _a[1];
            var newRowPosition = rowPosition + yMovement;
            var newColPosition = colPosition + xMovement;
            var fullPosition = [newRowPosition, newColPosition];
            if (isValidPosition(newRowPosition, newColPosition) &&
                !seen[newRowPosition][newColPosition]) {
                seen[newRowPosition][newColPosition] = true;
                var positionCharacter = gameGrid[newRowPosition][newColPosition];
                if (positionCharacter === FieldClass_js_1.Character.Hat)
                    return true;
                if (positionCharacter === FieldClass_js_1.Character.Field)
                    stack.push(fullPosition);
            }
        }
    }
    return false;
};
// const testField = [
//   ["!", "O", "O"],
//   ["░", "░", "░"],
//   ["O", "O", "^"],
// ];
// const playerPosition: [number, number] = [0, 0];
// console.log(isGameGridSolvable(testField, playerPosition));
module.exports.isGameGridSolvable = isGameGridSolvable;
