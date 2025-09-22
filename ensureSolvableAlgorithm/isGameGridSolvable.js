"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FieldClass_js_1 = require("../FieldClass.js");
var isGameGridSolvable = function (gameGrid, playerPosition) {
    var hashPosition = function (position) {
        var row = position[0], col = position[1];
        return "".concat(row, "-").concat(col);
    };
    var isValidPosition = function (row, col) {
        return (row >= 0 && row < gameGrid.length && col >= 0 && col < gameGrid[0].length);
    };
    var directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    var seen = [hashPosition(playerPosition)];
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
                !seen.includes(hashPosition(fullPosition))) {
                var positionCharacter = gameGrid[newRowPosition][newColPosition];
                if (positionCharacter === FieldClass_js_1.Character.Hat)
                    return true;
                var hashedPosition = hashPosition(fullPosition);
                if (positionCharacter === FieldClass_js_1.Character.Hole) {
                    seen.push(hashedPosition);
                }
                else {
                    stack.push(fullPosition);
                    seen.push(hashedPosition);
                }
            }
        }
    }
    return false;
};
// const testField = [
//   ["!", "O", "^"],
//   ["░", "░", "░"],
//   ["O", "O", "░"],
// ];
// const playerPosition: [number, number] = [0, 0];
// console.log(isGameGridSolvable(testField, playerPosition));
module.exports.isGameGridSolvable = isGameGridSolvable;
