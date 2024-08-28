//to get around ts block-scoped variable bug
export {};

const prompt = require('prompt-sync')({sigint: true});

const hat : string = '^';
const hole : string = 'O';
const fieldCharacter : string = '░';
const pathCharacter : string = '*';

class Field {
    
    gameGrid: null | string[][];
    playerRowPosition: number;
    playerColumnPosition: number;
    fieldHeight: number;
    fieldWidth: number;
    gameActive: boolean;
    holes: number[][];
    hardMode: boolean;
    holesHidden: boolean;
    
    constructor(gameGrid = null) {
        this.gameGrid = gameGrid;
        this.playerRowPosition = 0;
        this.playerColumnPosition = 0;
        this.fieldHeight = 0;
        this.fieldWidth = 0;
        this.gameActive = false;
        this.holes = [];
        this.hardMode = false;
        this.holesHidden = false;
    }

    //function for setting random position, to be used for player and hat in generateField
    getKeyPosition(fieldHeight : number, fieldWidth : number) {
        if (fieldHeight < 1 || fieldWidth < 1) {
            throw new Error('Height and width values cannot be less than 1!');
        }
        let row = Math.floor(Math.random() * fieldHeight);
        let column = Math.floor(Math.random() * fieldWidth);
        return [row, column];
    }

    generateField(fieldHeight : number, fieldWidth : number, percentageHoles : number, playerRandom : boolean = false, hatRandom : boolean = false) {
        let field : string[][] = [];
        this.fieldHeight = fieldHeight;
        this.fieldWidth = fieldWidth;

        //function that sets any given location to be a hole based on percentage chance
        const setHole = (percentageHoles) => {
            return Math.random() * 100 <= percentageHoles;
        }
    
        //fill out field with predefined height and width and fill with fieldCharacter
        for (let i = 0; i < fieldHeight; i++) {
            field.push(new Array(fieldWidth).fill(fieldCharacter));
        }

        //set player position in random spot if playerRandom is true
        playerRandom ? [this.playerRowPosition, this.playerColumnPosition] = this.getKeyPosition(fieldHeight, fieldWidth) : null;
        field[this.playerRowPosition][this.playerColumnPosition] = pathCharacter;
        
        //set hat in random spot if hatRandom is true, making sure it's not same spot as player
        let [hatRow, hatColumn] = [fieldHeight - 1, fieldWidth - 2];
        if (hatRandom) {
            do {
                [hatRow, hatColumn] = this.getKeyPosition(fieldHeight, fieldWidth);
            } while (hatRow === this.playerRowPosition && hatColumn === this.playerColumnPosition);
        }
        
        field[hatRow][hatColumn] = hat;
        
        
        let holeCount = 0;
        
        //randomly select spots to be holes if spot is already field character
        for (let row = 0; row < fieldHeight; row++) {
            for (let column = 0; column < fieldWidth; column++) {
                if (field[row][column] === fieldCharacter) {
                    if (setHole(percentageHoles)) {
                        field[row][column] = hole;
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
            } else {
                console.log('Game set to normal (holes are always visible).');
            }

            let makeCustomField = prompt('Would you like to define values for a custom field? Enter "y" or "n" >> ');
            switch (makeCustomField) {
                case 'y':
                    
                    let fieldHeight : number = Math.floor(Number(prompt('Enter an integer for the field height >> ')));
                    while (isNaN(fieldHeight) || fieldHeight < 2) {
                        fieldHeight = Math.floor(Number(prompt('Please enter a valid whole number greater than 1 >> ')));
                    }

                    let fieldWidth : number = Math.floor(Number(prompt('Enter an integer for the field width >> ')));
                    while (isNaN(fieldWidth) || fieldWidth < 2) {
                        fieldWidth = Math.floor(Number(prompt('Please enter a valid whole number greater than 1 >> ')));
                    }

                    let percentageHoles : number = Number(prompt('Enter an integer for the percentage of the field that will be holes >> '));
                    while (isNaN(percentageHoles)) {
                        percentageHoles = Number(prompt('Please enter a valid number >> '));
                    }

                    let playerRandom : string | boolean | null = prompt('Should the player\'s starting location be random? Enter "y" or "n" >> ');
                    while (playerRandom !== 'y' && playerRandom !== 'n') {
                        playerRandom = prompt('Please enter "y" or "n" >> ');
                    }
                    playerRandom === 'y' ? playerRandom = true : playerRandom = false;
                
                    let hatRandom : string | boolean | null = prompt('Should the hat\'s location be random? Enter "y" or "n" >> ');
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
        const victoryArray : string[][] = 
            [
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
            this.gameGrid[hole[0]][hole[1]] = fieldCharacter;
        }
        this.holesHidden = true;
    }

    move(direction : string | null) {
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

    meetsEndConditions(newPosition : number[]) {
        if (this.gameGrid === null) {
            console.log('This method cannot be used until a game grid has been provided');
            return;
        }

        let [newPositionRow, newPositionColumn] = newPosition;

        let stringifiedPosition = JSON.stringify(newPosition);
        if (newPositionRow < 0 || newPositionRow > this.fieldHeight - 1 || newPositionColumn < 0 || newPositionColumn > this.fieldWidth - 1) {
            this.gameOver('out');
            return true;
        } else if (this.gameGrid[newPositionRow][newPositionColumn] === hat) {
            this.gameOver(hat);
            return true;
        } else if (this.holes.find((element) => JSON.stringify(element) === stringifiedPosition)) {
            this.gameOver(hole);
            return true;
        } else {
            return false;
        }
    }

    gameOver(reason : string) {
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
                this.printVictory();
                console.log('You found your hat! Thank God. Victory!');
                this.gameActive = false;
        }
    }
}

module.exports.Field = Field;