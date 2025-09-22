import mapGameGrid from "./mapGameGrid.js";
import getPositionString from "./getPositionString.js";
import findPathToHat from "./findPathToHat.js";
import { Character } from "../FieldClass.js";

const isGameGridSolvable = (
  gameGrid: string[][],
  playerPosition: [number, number]
) => {
  const hashPosition = (position: [number, number]) => {
    const [row, col] = position;
    return `${row}-${col}`;
  };
  const isValidPosition = (row, col) => {
    return (
      row >= 0 && row < gameGrid.length && col >= 0 && col < gameGrid[0].length
    );
  };
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const seen = [hashPosition(playerPosition)];
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
        !seen.includes(hashPosition(fullPosition))
      ) {
        const positionCharacter = gameGrid[newRowPosition][newColPosition];
        if (positionCharacter === Character.Hat) return true;
        const hashedPosition = hashPosition(fullPosition);
        if (positionCharacter === Character.Hole) {
          seen.push(hashedPosition);
        } else {
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
