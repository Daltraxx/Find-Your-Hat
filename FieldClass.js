"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompt = require('prompt-sync')({ sigint: true });
var Character;
(function (Character) {
    Character["Hat"] = "^";
    Character["Hole"] = "O";
    Character["Field"] = "\u2591";
    Character["Path"] = "*";
})(Character || (Character = {}));
class Field {
    constructor(gameGrid) {
        this.gameGrid = gameGrid;
        this.playerRowPosition = 0;
        this.playerColumnPosition = 0;
        this.hatRowPosition = this.fieldHeight - 1;
        this.hatColumnPosition = this.fieldWidth - 2;
        this.fieldHeight = 0;
        this.fieldWidth = 0;
        this.gameActive = false;
        this.holes = [];
        this.hardMode = false;
        this.holesHidden = false;
    }
    //function for setting random position, to be used for player and hat in generateField
    getKeyPosition(fieldHeight, fieldWidth) {
        if (fieldHeight < 1 || fieldWidth < 1) {
            throw new Error('Height and width values cannot be less than 1!');
        }
        let row = Math.floor(Math.random() * fieldHeight);
        let column = Math.floor(Math.random() * fieldWidth);
        return [row, column];
    }
    getHatPosition() {
        if (this.gameGrid === null) {
            throw new Error('Game Grid must already be provided.');
        }
        for (let i = 0; i < this.gameGrid.length; i++) {
            for (let j = 0; j < this.gameGrid[i].length; j++) {
                if (this.gameGrid[i][j] === Character.Hat) {
                    [this.hatRowPosition, this.hatColumnPosition] = [i, j];
                    break;
                }
            }
        }
    }
    getPlayerPosition() {
        if (this.gameGrid === null) {
            throw new Error('Game Grid must already be provided.');
        }
        for (let i = 0; i < this.gameGrid.length; i++) {
            for (let j = 0; j < this.gameGrid[i].length; j++) {
                if (this.gameGrid[i][j] === Character.Path) {
                    [this.playerRowPosition, this.playerColumnPosition] = [i, j];
                    break;
                }
            }
        }
    }
    generateField(fieldHeight, fieldWidth, percentageHoles, playerRandom = false, hatRandom = false) {
        let field = [];
        this.fieldHeight = fieldHeight;
        this.fieldWidth = fieldWidth;
        //function that sets any given location to be a hole based on percentage chance
        const setHole = (percentageHoles) => {
            return Math.random() * 100 <= percentageHoles;
        };
        //fill out field with predefined height and width and fill with fieldCharacter
        for (let i = 0; i < fieldHeight; i++) {
            field.push(new Array(fieldWidth).fill(Character.Field));
        }
        //set player position in random spot if playerRandom is true
        playerRandom ? [this.playerRowPosition, this.playerColumnPosition] = this.getKeyPosition(fieldHeight, fieldWidth) : null;
        field[this.playerRowPosition][this.playerColumnPosition] = Character.Path;
        //set hat in random spot if hatRandom is true, making sure it's not same spot as player
        if (hatRandom) {
            do {
                [this.hatRowPosition, this.hatColumnPosition] = this.getKeyPosition(fieldHeight, fieldWidth);
            } while (this.hatRowPosition === this.playerRowPosition && this.hatColumnPosition === this.playerColumnPosition);
        }
        else {
            [this.hatRowPosition, this.hatColumnPosition] = [fieldHeight - 1, fieldWidth - 2];
        }
        field[this.hatRowPosition][this.hatColumnPosition] = Character.Hat;
        //randomly select spots to be holes if spot is already field character
        let holeCount = 0;
        for (let row = 0; row < fieldHeight; row++) {
            for (let column = 0; column < fieldWidth; column++) {
                if (field[row][column] === Character.Field) {
                    if (setHole(percentageHoles)) {
                        field[row][column] = Character.Hole;
                        this.holes.push([row, column]);
                        holeCount++;
                        //ensure there are never more holes than the percentage allows
                        if (holeCount >= Math.floor((fieldHeight * fieldWidth) * (percentageHoles / 100))) {
                            return field;
                        }
                    }
                }
            }
        }
        return field;
    }
    playGame() {
        //if no field is provided, ask player if they want to define settings for one
        if (this.gameGrid === null) {
            let hardMode = prompt('Hard mode? Enter "y" or "n" >> ');
            if (hardMode === 'y') {
                this.hardMode = true;
                console.log('Game is set to Hard (holes are hidden after the first move).');
            }
            else {
                console.log('Game set to normal (holes are always visible).');
            }
            let makeCustomField = prompt('Would you like to define values for a custom field? Enter "y" or "n" >> ');
            switch (makeCustomField) {
                case 'y':
                    let fieldHeight = Math.floor(Number(prompt('Enter an integer for the field height >> ')));
                    while (isNaN(fieldHeight) || fieldHeight < 2) {
                        fieldHeight = Math.floor(Number(prompt('Please enter a valid whole number greater than 1 >> ')));
                    }
                    let fieldWidth = Math.floor(Number(prompt('Enter an integer for the field width >> ')));
                    while (isNaN(fieldWidth) || fieldWidth < 2) {
                        fieldWidth = Math.floor(Number(prompt('Please enter a valid whole number greater than 1 >> ')));
                    }
                    let percentageHoles = Number(prompt('Enter an integer for the percentage of the field that will be holes >> '));
                    while (isNaN(percentageHoles)) {
                        percentageHoles = Number(prompt('Please enter a valid number >> '));
                    }
                    let playerRandom = prompt('Should the player\'s starting location be random? Enter "y" or "n" >> ');
                    while (playerRandom !== 'y' && playerRandom !== 'n') {
                        playerRandom = prompt('Please enter "y" or "n" >> ');
                    }
                    playerRandom === 'y' ? playerRandom = true : playerRandom = false;
                    let hatRandom = prompt('Should the hat\'s location be random? Enter "y" or "n" >> ');
                    while (hatRandom !== 'y' && hatRandom !== 'n') {
                        hatRandom = prompt('Please enter "y" or "n" >> ');
                    }
                    hatRandom === 'y' ? hatRandom = true : hatRandom = false;
                    this.gameGrid = this.generateField(fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom);
                    break;
                case 'n':
                    this.hardMode ? this.gameGrid = this.generateField(5, 10, 15) : this.gameGrid = this.generateField(10, 20, 15);
                    break;
                default:
                    console.log('Invalid input. Starting game with predetermined field settings.');
                    this.hardMode ? this.gameGrid = this.generateField(5, 10, 15) : this.gameGrid = this.generateField(10, 20, 15);
            }
        }
        console.log("Select a WASD control and press enter to navigate the map and find your hat!");
        this.gameActive = true;
        while (this.gameActive) {
            this.playTurn();
        }
    }
    printField() {
        if (this.gameGrid === null) {
            console.log('This method cannot be used until a game grid has been provided');
            return;
        }
        for (let row of this.gameGrid) {
            console.log(row.join(''));
        }
    }
    printVictory() {
        const victoryArray = [
            ['*', '░', '*', '░', '░', '░', '░', '░', '░', '░', '*', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░'],
            ['*', '░', '*', '░', '░', '░', '░', '░', '░', '░', '*', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░'],
            ['*', '░', '*', '░', '░', '░', '░', '░', '░', '*', '*', '*', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░'],
            ['*', '░', '*', '░', '*', '░', '░', '░', '░', '░', '*', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░'],
            ['*', '░', '*', '░', '░', '░', '░', '░', '░', '░', '*', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░', '░'],
            ['*', '░', '*', '░', '*', '░', '*', '*', '*', '░', '*', '░', '*', '*', '*', '░', '*', '░', '░', '░', '*', '░', '*', '░'],
            ['*', '░', '*', '░', '*', '░', '*', '░', '░', '░', '*', '░', '*', '░', '*', '░', '*', '*', '*', '░', '*', '░', '*', '░'],
            ['*', '░', '*', '░', '*', '░', '*', '░', '░', '░', '*', '░', '*', '░', '*', '░', '*', '░', '*', '░', '*', '*', '*', '░'],
            ['*', '░', '*', '░', '*', '░', '*', '░', '░', '░', '*', '░', '*', '░', '*', '░', '*', '░', '░', '░', '░', '*', '░', '░'],
            ['░', '*', '░', '░', '*', '░', '*', '*', '*', '░', '*', '░', '*', '*', '*', '░', '*', '░', '░', '░', '░', '*', '░', '░']
        ];
        for (let row of victoryArray) {
            console.log(row.join(''));
        }
    }
    playTurn() {
        this.printField();
        if (this.hardMode && !this.holesHidden) {
            this.hideHoles();
        }
        const direction = prompt('Which direction would you like to move? >> ');
        this.move(direction);
    }
    //for use when this.hardMode is set to true
    hideHoles() {
        if (this.gameGrid === null) {
            console.log('This method cannot be used until a game grid has been provided');
            return;
        }
        for (let hole of this.holes) {
            this.gameGrid[hole[0]][hole[1]] = Character.Field;
        }
        this.holesHidden = true;
    }
    move(direction) {
        if (this.gameGrid === null) {
            console.log('This method cannot be used until a game grid has been provided');
            return;
        }
        switch (direction) {
            case 'a':
                this.moveleft();
                break;
            case 'd':
                this.moveRight();
                break;
            case 'w':
                this.moveUp();
                break;
            case 's':
                this.moveDown();
                break;
            default:
                console.log("Please enter a valid WASD control.");
        }
    }
    moveleft() {
        if (this.gameGrid === null) {
            console.log('This method cannot be used until a game grid has been provided');
            return;
        }
        const newPosition = [this.playerRowPosition, this.playerColumnPosition - 1];
        if (this.meetsEndConditions(newPosition)) {
            return;
        }
        this.playerColumnPosition -= 1;
        this.gameGrid[this.playerRowPosition][this.playerColumnPosition] = '*';
    }
    moveRight() {
        if (this.gameGrid === null) {
            console.log('This method cannot be used until a game grid has been provided');
            return;
        }
        const newPosition = [this.playerRowPosition, this.playerColumnPosition + 1];
        if (this.meetsEndConditions(newPosition)) {
            return;
        }
        this.playerColumnPosition += 1;
        this.gameGrid[this.playerRowPosition][this.playerColumnPosition] = '*';
    }
    moveUp() {
        if (this.gameGrid === null) {
            console.log('This method cannot be used until a game grid has been provided');
            return;
        }
        const newPosition = [this.playerRowPosition - 1, this.playerColumnPosition];
        if (this.meetsEndConditions(newPosition)) {
            return;
        }
        this.playerRowPosition -= 1;
        this.gameGrid[this.playerRowPosition][this.playerColumnPosition] = '*';
    }
    moveDown() {
        if (this.gameGrid === null) {
            console.log('This method cannot be used until a game grid has been provided');
            return;
        }
        const newPosition = [this.playerRowPosition + 1, this.playerColumnPosition];
        if (this.meetsEndConditions(newPosition)) {
            return;
        }
        this.playerRowPosition += 1;
        this.gameGrid[this.playerRowPosition][this.playerColumnPosition] = '*';
    }
    meetsEndConditions(newPosition) {
        if (this.gameGrid === null) {
            console.log('This method cannot be used until a game grid has been provided');
            return;
        }
        let [newPositionRow, newPositionColumn] = newPosition;
        let stringifiedPosition = JSON.stringify(newPosition);
        if (newPositionRow < 0 || newPositionRow > this.fieldHeight - 1 || newPositionColumn < 0 || newPositionColumn > this.fieldWidth - 1) {
            this.gameOver('out');
            return true;
        }
        else if (this.gameGrid[newPositionRow][newPositionColumn] === Character.Hat) {
            this.gameOver('win');
            return true;
        }
        else if (this.holes.find((element) => JSON.stringify(element) === stringifiedPosition)) {
            this.gameOver('fell');
            return true;
        }
        else {
            return false;
        }
    }
    gameOver(reason) {
        switch (reason) {
            case 'out':
                console.log('You went out of bounds! Game Over.');
                this.gameActive = false;
                break;
            case 'fell':
                console.log('You fell down a hole! Game Over.');
                this.gameActive = false;
                break;
            default:
                this.printVictory();
                console.log('You found your hat! Thank God. Victory!');
                this.gameActive = false;
        }
    }
}
module.exports.Field = Field;
