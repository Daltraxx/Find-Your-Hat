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

    print() {
        for (let arr of this.gameGrid) {
            console.log(arr.join(''));
        }
    }

    playGame() {
        if (this.gameGrid === null) {
            this.gameGrid = this.generateField(10, 20, 20, true, true);
        }
        console.log("Select a WASD control and press enter to navigate the map and find your hat!");
        this.gameActive = true;
        while (this.gameActive) {
            this.playTurn();
        }
    }

    playTurn() {
        this.print();
        const direction = prompt('Which direction would you like to move? >> ');
        this.move(direction);
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

        this.gameGrid = field;

    }

}

/*
let testField = new Field(Field.generateField(10, 20, 20, true, true));
testField.print();
*/


