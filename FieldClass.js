const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


module.exports = class Field {
    constructor(gameGrid) {
        this.gameGrid = gameGrid;
        this.playerPosition = [0, 0];
        this.gameActive = true;
        /*
        this.hatPosition = null;
        this.getHatPosition(gameGrid);
        */
    }

    print() {
        for (let arr of this.gameGrid) {
            console.log(arr.join(''));
        }
    }

    /*
    getHatPosition(map) {
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] === '^') {
                    this.hatPosition = [i, j];
                }
            }
        }
    }
    */

    playGame() {
        console.log("Select a WASD control and press enter to navigate the map and find your hat!");
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
        const newPosition = this.gameGrid[this.playerPosition[0]][this.playerPosition[1] - 1];
        if (this.meetsEndConditions(newPosition)) {
            return;
        }
        this.playerPosition[1] -= 1;
        this.gameGrid[this.playerPosition[0]][this.playerPosition[1]] = '*';
    }

    moveRight() {
        const newPosition = this.gameGrid[this.playerPosition[0]][this.playerPosition[1] + 1];
        if (this.meetsEndConditions(newPosition)) {
            return;
        }
        this.playerPosition[1] += 1;
        this.gameGrid[this.playerPosition[0]][this.playerPosition[1]] = '*';
        
    }

    moveUp() {
        //try catch statement required in cases of vertical movement
        //(trying to read first index of undefined - out of bounds - will halt program)
        try {
            const newPosition = this.gameGrid[this.playerPosition[0] - 1][this.playerPosition[1]];
        } catch {
            this.gameOver('out');
            return;
        }
        const newPosition = this.gameGrid[this.playerPosition[0] - 1][this.playerPosition[1]];
        if (this.meetsEndConditions(newPosition)) {
            return;
        }
        this.playerPosition[0] -= 1;
        this.gameGrid[this.playerPosition[0]][this.playerPosition[1]] = '*';

    }
        
    moveDown() {
        try {
            const newPosition = this.gameGrid[this.playerPosition[0] + 1][this.playerPosition[1]];
        } catch {
            this.gameOver('out');
            return;
        }

        const newPosition = this.gameGrid[this.playerPosition[0] + 1][this.playerPosition[1]];
        if (this.meetsEndConditions(newPosition)) {
            return;
        }
        this.playerPosition[0] += 1;
        this.gameGrid[this.playerPosition[0]][this.playerPosition[1]] = '*';

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

    static generateField(fieldHeight, fieldWidth, percentageHoles) {
        let field = [];

        //function that sets any given location to be a hole based on percentage chance
        const setHole = (percentageHoles) => {
            return Math.random() * 100 <= percentageHoles;
        }
    
        for (let i = 0; i < fieldHeight; i++) {
            field.push(new Array(fieldWidth).fill(fieldCharacter));
        }

        //set player position in fixed spot for now
        field[0][0] = pathCharacter;
        //set hat in fixed position for now
        field[fieldHeight - 1][fieldWidth - 2] = hat;
        
        let holeCount = 0;
        
        for (let row = 0; row < fieldHeight; row++) {
            for (let column = 0; column < fieldWidth; column++) {
                if (field[row][column] === fieldCharacter) {
                    if (setHole(percentageHoles)) {
                        field[row][column] = hole
                        holeCount++;
                        //ensure there are never more holes than the percentage allows
                        if (holeCount >= Math.floor((fieldHeight * fieldWidth) * (percentageHoles / 100))) {
                            console.log(holeCount);
                            return field;
                        }
                    }
                    
                }
            }
        }

        return field;

    }

}

//console.log(Field.generateField(10, 20, 20));

