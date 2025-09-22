import mapGameGrid from "./mapGameGrid.js";
import getPositionString from "./getPositionString.js";
import findPathToHat from "./findPathToHat.js";
import { Character } from "../FieldClass.js";

const isGameGridSolvable = (
  gameGrid: string[][],
  playerPosition: [number, number]
) => {
  const gridHeight = gameGrid.length;
  const gridWidth = gameGrid[0].length;
  const seen = new Array(gridHeight);
  for (let i = 0; i < seen.length; i++) {
    seen[i] = new Array(gridWidth);
    seen[i].fill(false);
  }

  seen[playerPosition[0]][playerPosition[1]] = true;

  const isValidPosition = (row: number, col: number) => {
    return row >= 0 && row < gridHeight && col >= 0 && col < gridWidth;
  };
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const stack = [playerPosition];
  while (stack.length) {
    const position = stack.pop();
    if (!position) continue;
    let [rowPosition, colPosition] = position;
    for (let [xMovement, yMovement] of directions) {
      const newRowPosition = rowPosition + yMovement;
      const newColPosition = colPosition + xMovement;
      const fullPosition: [number, number] = [newRowPosition, newColPosition];
      if (
        isValidPosition(newRowPosition, newColPosition) &&
        !seen[newRowPosition][newColPosition]
      ) {
        seen[newRowPosition][newColPosition] = true;
        const positionCharacter = gameGrid[newRowPosition][newColPosition];
        if (positionCharacter === Character.Hat) return true;
        if (positionCharacter === Character.Field) stack.push(fullPosition);
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
