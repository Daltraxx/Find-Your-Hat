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
        const newPosition = this.gameGrid[this.playerPosition[0] - 1][this.playerPosition[1]];
        if (this.meetsEndConditions(newPosition)) {
            return;
        }
        this.playerPosition[0] -= 1;
        this.gameGrid[this.playerPosition[0]][this.playerPosition[1]] = '*';

    }
        
    moveDown() {
        //try catch statement required in this case so error doesn't stop program
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
            case '^':
                this.gameOver('win');
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