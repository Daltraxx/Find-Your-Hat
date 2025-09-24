# Find Your Hat
 A game where the player must navigate a grid while avoiding traps. The default is a predetermined map in which the player can move in four directions to navigate towards the end goal. Before starting, the player is afforded the option of applying modifiers including the following: randomly generated start and end positions, randomly positioning traps, setting the percentage of the grid made up by traps, and hiding the traps after the player's first move, enabling the "true" way of playing the game, making it a test of memorization. Custom fields can also be manually defined.

 Each randomly generated grid is verified as solvable via a DFS algorithm. Extensive testing is written with Mocha. User prompts are handled using prompt-sync. The game and its logic are encapsulated in a Field class following OOP principles.

## Getting Started

### Installation

* Simply clone this repository to your device
* Run ```npm i``` from the root directory to install the program's dependencies.

### Dependencies

* Node installation for runtime environment

### Executing the Program

* Run ```npm start``` from the installation folder's root directory. You will then be given a series of prompts to define your game.
* Manually defined fields can be made by modifying the field withing the Field constructor in main.ts (must be compiled after alteration using ```tsc main.ts```) or main.js (not recommended). 

### Authors

[Dalton Pettus](https://www.daltonpettus.com/)

## License

This project is licensed under the MIT License - see the LICENSE file for details