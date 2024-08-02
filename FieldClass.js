const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


module.exports = class Field {
    constructor(gameGrid = null) {
        this.gameGrid = gameGrid;
        this.playerRowPosition = 0;
        this.playerColumnPosition = 0;
        this.gameActive = false;
    }

    //function for setting random position, to be used for player and hat in generateField
    getKeyPosition(fieldHeight, fieldWidth) {
        let row = Math.floor(Math.random() * fieldHeight);
        let column = Math.floor(Math.random() * fieldWidth);
        return [row, column];
    }

    generateField(fieldHeight, fieldWidth, percentageHoles, playerRandom = false, hatRandom = false) {
        let field = [];

        //function that sets any given location to be a hole based on percentage chance
        const setHole = (percentageHoles) => {
            return Math.random() * 100 <= percentageHoles;
        }
    
        //fill out field with predefined height and width and fill with fieldCharacter
        for (let i = 0; i < fieldHeight; i++) {
            field.push(new Array(fieldWidth).fill(fieldCharacter));
        }

        //set player position in random spot if playerRandom is true
        let [playerRow, playerColumn] = [this.playerRowPosition, this.playerColumnPosition];
        playerRandom ? [playerRow, playerColumn] = this.getKeyPosition(fieldHeight, fieldWidth) : null;
        [this.playerRowPosition, this.playerColumnPosition] = [playerRow, playerColumn];
        field[playerRow][playerColumn] = pathCharacter;
        
        //set hat in random spot if hatRandom is true, making sure it's not same spot as player
        let [hatRow, hatColumn] = [fieldHeight - 1, fieldWidth - 2];
        if (hatRandom) {
            do {
                [hatRow, hatColumn] = this.getKeyPosition(fieldHeight, fieldWidth);
            } while (hatRow === playerRow && hatColumn === playerColumn);
        }
        
        field[hatRow][hatColumn] = hat;
        
        
        let holeCount = 0;
        
        //randomly select spots to be holes if spot is already field character
        for (let row = 0; row < fieldHeight; row++) {
            for (let column = 0; column < fieldWidth; column++) {
                if (field[row][column] === fieldCharacter) {
                    if (setHole(percentageHoles)) {
                        field[row][column] = hole
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
        //if no field is provided, ask player is they want to define settings for one
        if (this.gameGrid === null) {
            let makeCustomField = prompt('Would you like to define values for a custom field? Enter "y" or "n" >> ');
            switch (makeCustomField) {
                case 'y':
                    let fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom;
                    fieldHeight = Math.floor(prompt('Enter an integer for the field height >> '));
                    while (isNaN(fieldHeight) || fieldHeight < 2) {
                        fieldHeight = Math.floor(prompt('Please enter a valid whole number greater than 1 >> '));
                    }

                    fieldWidth = Math.floor(prompt('Enter an integer for the field width >> '));
                    while (isNaN(fieldWidth) || fieldWidth < 2) {
                        fieldWidth = Math.floor(prompt('Please enter a valid whole number greater than 1 >> '));
                    }

                    percentageHoles = Number(prompt('Enter an integer for the percentage of the field that will be holes >> '));
                    while (isNaN(percentageHoles)) {
                        percentageHoles = Number(prompt('Please enter a valid number >> '));
                    }

                    playerRandom = prompt('Should the player\'s starting location be random? Enter "y" or "n" >> ');
                    while (playerRandom !== 'y' && playerRandom !== 'n') {
                        playerRandom = prompt('Please enter "y" or "n" >> ');
                    }
                    playerRandom === 'y' ? playerRandom = true : playerRandom = false;
                
                    hatRandom = prompt('Should the hat\'s location be random? Enter "y" or "n" >> ');
                    while (hatRandom !== 'y' && hatRandom !== 'n') {
                        hatRandom = prompt('Please enter "y" or "n" >> ');
                    }
                    hatRandom === 'y' ? hatRandom = true : hatRandom = false;

                    this.gameGrid = this.generateField(fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom);
                    break;
                case 'n':
                    this.gameGrid = this.generateField(10, 20, 20);
                    break;
                default:
                    console.log('Invalid input. Starting game with predetermined field settings.');
                    this.gameGrid = this.generateField(10, 20, 20);                   
            }
        }

        console.log("Select a WASD control and press enter to navigate the map and find your hat!");
        this.gameActive = true;
        while (this.gameActive) {
            this.playTurn();
        }
    }   

    playTurn() {
        this.printField();
        const direction = prompt('Which direction would you like to move? >> ');
        this.move(direction);
    }

    printField() {
        for (let arr of this.gameGrid) {
            console.log(arr.join(''));
        }
    }

    move(direction) {
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
        const newPosition = this.gameGrid[this.playerRowPosition][this.playerColumnPosition - 1];
        if (this.meetsEndConditions(newPosition)) {
            return;
        }
        this.playerColumnPosition -= 1;
        this.gameGrid[this.playerRowPosition][this.playerColumnPosition] = '*';
    }

    moveRight() {
        const newPosition = this.gameGrid[this.playerRowPosition][this.playerColumnPosition + 1];
        if (this.meetsEndConditions(newPosition)) {
            return;
        }
        this.playerColumnPosition += 1;
        this.gameGrid[this.playerRowPosition][this.playerColumnPosition] = '*';
        
    }

    moveUp() {
        //try catch statement required in cases of vertical movement
        //(trying to read first index of undefined - out of bounds - will halt program)
        try {
            const newPosition = this.gameGrid[this.playerRowPosition - 1][this.playerColumnPosition];
        } catch {
            this.gameOver('out');
            return;
        }
        const newPosition = this.gameGrid[this.playerRowPosition - 1][this.playerColumnPosition];
        if (this.meetsEndConditions(newPosition)) {
            return;
        }
        this.playerRowPosition -= 1;
        this.gameGrid[this.playerRowPosition][this.playerColumnPosition] = '*';

    }
        
    moveDown() {
        try {
            const newPosition = this.gameGrid[this.playerRowPosition + 1][this.playerColumnPosition];
        } catch {
            this.gameOver('out');
            return;
        }

        const newPosition = this.gameGrid[this.playerRowPosition + 1][this.playerColumnPosition];
        if (this.meetsEndConditions(newPosition)) {
            return;
        }
        this.playerRowPosition += 1;
        this.gameGrid[this.playerRowPosition][this.playerColumnPosition] = '*';

    }

    meetsEndConditions(newPosition) {
        switch (newPosition) {
            case undefined:
                this.gameOver('out');
                return true;
            case hole:
                this.gameOver(hole);
                return true;
            case hat:
                this.gameOver(hat);
                return true;
            default:
                return false;
        }
    }

    gameOver(reason) {
        switch (reason) {
            case 'out': 
                console.log('You went out of bounds! Game Over.');
                this.gameActive = false;
                break;
            case hole:
                console.log('You fell down a hole! Game Over.');
                this.gameActive = false;
                break;
            default:
                console.log('You found your hat! Thank God. Victory!');
                this.gameActive = false;
        }
    }

}


//let testField = new Field();
/*
testField.generateField(2, 2, 0, true, true);
testField.printField();
*/

//testField.playGame();



