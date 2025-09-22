"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
var isGameGridSolvable = require('./ensureSolvableAlgorithm/isGameGridSolvable').isGameGridSolvable;
var prompt = require('prompt-sync')({ sigint: true });
var Character;
(function (Character) {
    Character["Player"] = "!";
    Character["Hat"] = "^";
    Character["Hole"] = "O";
    Character["Field"] = "\u2591";
    Character["Path"] = "*";
})(Character || (exports.Character = Character = {}));
var GameOverReason;
(function (GameOverReason) {
    GameOverReason["OutOfBounds"] = "out";
    GameOverReason["Win"] = "win";
    GameOverReason["FellInHole"] = "fell";
})(GameOverReason || (GameOverReason = {}));
var Field = /** @class */ (function () {
    function Field(gameGrid) {
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
    Field.prototype.getRandomKeyPosition = function (fieldHeight, fieldWidth) {
        if (fieldHeight < 1 || fieldWidth < 1) {
            throw new Error('Height and width values cannot be less than 1!');
        }
        var row = Math.floor(Math.random() * fieldHeight);
        var column = Math.floor(Math.random() * fieldWidth);
        return [row, column];
    };
    Field.prototype.setHatPosition = function () {
        var _a;
        if (this.gameGrid === undefined) {
            throw new Error('Game Grid must already be provided.');
        }
        for (var row = 0; row < this.gameGrid.length; row++) {
            for (var column = 0; column < this.gameGrid[row].length; column++) {
                if (this.gameGrid[row][column] === Character.Hat) {
                    _a = [row, column], this.hatRowPosition = _a[0], this.hatColumnPosition = _a[1];
                    break;
                }
            }
        }
    };
    Field.prototype.setPlayerPosition = function () {
        var _a;
        if (this.gameGrid === undefined) {
            throw new Error('Game Grid must already be provided.');
        }
        for (var row = 0; row < this.gameGrid.length; row++) {
            for (var column = 0; column < this.gameGrid[row].length; column++) {
                if (this.gameGrid[row][column] === Character.Player) {
                    _a = [row, column], this.playerRowPosition = _a[0], this.playerColumnPosition = _a[1];
                    break;
                }
            }
        }
    };
    Field.prototype.setFieldDimensions = function () {
        if (this.gameGrid === undefined) {
            throw new Error('Game Grid must already be provided.');
        }
        this.fieldHeight = this.gameGrid.length;
        this.fieldWidth = this.gameGrid[0].length;
    };
    Field.prototype.setHoles = function () {
        if (this.gameGrid === undefined) {
            throw new Error('Game Grid must already be provided.');
        }
        for (var row = 0; row < this.gameGrid.length; row++) {
            for (var column = 0; column < this.gameGrid[row].length; column++) {
                if (this.gameGrid[row][column] === Character.Hole) {
                    this.holes.push([row, column]);
                }
            }
        }
    };
    Field.prototype.populateRandomHoles = function (field, percentageHoles) {
        //function that sets any given location to be a hole based on percentage chance
        var setHole = function (percentageHoles) {
            return Math.random() * 100 <= percentageHoles;
        };
        //ensure this.holes is empty to start out
        this.holes = [];
        //randomly select spots to be holes if spot is already field character
        var allowedHoles = Math.floor(((this.fieldHeight * this.fieldWidth) - 2) * (percentageHoles / 100));
        var holeCount = 0;
        while (holeCount < allowedHoles) {
            for (var row = 0; row < this.fieldHeight; row++) {
                for (var column = 0; column < this.fieldWidth; column++) {
                    if (field[row][column] === Character.Field) {
                        if (setHole(percentageHoles)) {
                            field[row][column] = Character.Hole;
                            this.holes.push([row, column]);
                            holeCount++;
                            //ensure there are never more holes than the percentage allows
                            if (holeCount === allowedHoles) {
                                return;
                            }
                        }
                    }
                }
            }
        }
    };
    Field.prototype.generateField = function (fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom) {
        var _a, _b, _c;
        if (playerRandom === void 0) { playerRandom = false; }
        if (hatRandom === void 0) { hatRandom = false; }
        var field;
        this.fieldHeight = fieldHeight;
        this.fieldWidth = fieldWidth;
        var playerPosition;
        field = [];
        //fill out field with predefined height and width and fill with fieldCharacter
        for (var i = 0; i < fieldHeight; i++) {
            field.push(new Array(fieldWidth).fill(Character.Field));
        }
        //set player position in random spot if playerRandom is true
        if (playerRandom)
            _a = this.getRandomKeyPosition(fieldHeight, fieldWidth), this.playerRowPosition = _a[0], this.playerColumnPosition = _a[1];
        playerPosition = [this.playerRowPosition, this.playerColumnPosition];
        field[this.playerRowPosition][this.playerColumnPosition] = Character.Player;
        //set hat in random spot if hatRandom is true, making sure it's not same spot as player
        if (hatRandom) {
            do {
                _b = this.getRandomKeyPosition(fieldHeight, fieldWidth), this.hatRowPosition = _b[0], this.hatColumnPosition = _b[1];
            } while (this.hatRowPosition === this.playerRowPosition && this.hatColumnPosition === this.playerColumnPosition);
        }
        else {
            _c = [fieldHeight - 1, fieldWidth - 2], this.hatRowPosition = _c[0], this.hatColumnPosition = _c[1];
        }
        field[this.hatRowPosition][this.hatColumnPosition] = Character.Hat;
        //set random holes up to allowed percentage
        this.populateRandomHoles(field, percentageHoles);
        return field;
    };
    /*this version commented out until gameGridSolvable is working
    generateField(fieldHeight : number, fieldWidth : number, percentageHoles : number, playerRandom : boolean = false, hatRandom : boolean = false): string[][] {
        let field : string[][];
        this.fieldHeight = fieldHeight;
        this.fieldWidth = fieldWidth;
    
        let playerPosition : number[];

        do {
            field = [];
            //fill out field with predefined height and width and fill with fieldCharacter
            for (let i = 0; i < fieldHeight; i++) {
                field.push(new Array(fieldWidth).fill(Character.Field));
            }

            //set player position in random spot if playerRandom is true
            if (playerRandom) [this.playerRowPosition, this.playerColumnPosition] = this.getRandomKeyPosition(fieldHeight, fieldWidth);
            playerPosition = [this.playerRowPosition, this.playerColumnPosition];
            
            field[this.playerRowPosition][this.playerColumnPosition] = Character.Player;
            
            //set hat in random spot if hatRandom is true, making sure it's not same spot as player
            if (hatRandom) {
                do {
                    [this.hatRowPosition, this.hatColumnPosition] = this.getRandomKeyPosition(fieldHeight, fieldWidth);
                } while (this.hatRowPosition === this.playerRowPosition && this.hatColumnPosition === this.playerColumnPosition);
            } else {
                [this.hatRowPosition, this.hatColumnPosition] = [fieldHeight - 1, fieldWidth - 2];
            }
            
            field[this.hatRowPosition][this.hatColumnPosition] = Character.Hat;
            
            //set random holes up to allowed percentage
            this.populateRandomHoles(field, percentageHoles);
        } while (!this.gameGridSolvable(field, playerPosition));

        
        

        return field;
    }
    */
    Field.prototype.gameGridSolvable = function (gameGrid, playerPosition) {
        return isGameGridSolvable(gameGrid, playerPosition);
    };
    Field.prototype.getUserFieldValues = function () {
        var makeCustomField = prompt('Would you like to define values for a custom field? Enter "y" or "n" >> ');
        switch (makeCustomField) {
            case 'y':
                var fieldHeight = Math.floor(Number(prompt('Enter an integer for the field height >> ')));
                while (isNaN(fieldHeight) || fieldHeight < 2) {
                    fieldHeight = Math.floor(Number(prompt('Please enter a valid whole number greater than 1 >> ')));
                }
                var fieldWidth = Math.floor(Number(prompt('Enter an integer for the field width >> ')));
                while (isNaN(fieldWidth) || fieldWidth < 2) {
                    fieldWidth = Math.floor(Number(prompt('Please enter a valid whole number greater than 1 >> ')));
                }
                var percentageHoles = Number(prompt('Enter an integer for the percentage of the field that will be holes >> '));
                while (isNaN(percentageHoles)) {
                    percentageHoles = Number(prompt('Please enter a valid number >> '));
                }
                var playerRandom = prompt('Should the player\'s starting location be random? Enter "y" or "n" >> ');
                while (playerRandom !== 'y' && playerRandom !== 'n') {
                    playerRandom = prompt('Please enter "y" or "n" >> ');
                }
                playerRandom === 'y' ? playerRandom = true : playerRandom = false;
                var hatRandom = prompt('Should the hat\'s location be random? Enter "y" or "n" >> ');
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
    };
    Field.prototype.playGame = function () {
        var useProvidedField = prompt('Enter "1" to randomly generate a field, or "2" to use one in this file >> ');
        switch (useProvidedField) {
            case '1':
                this.getUserFieldValues();
                break;
            case '2':
                this.setFieldDimensions();
                this.setHatPosition();
                this.setPlayerPosition();
                this.setHoles();
                break;
            default:
                console.log('Invalid input. Using field in file.');
                this.setFieldDimensions();
                this.setHatPosition();
                this.setPlayerPosition();
                this.setHoles();
        }
        var hardMode = prompt('Hard mode? Enter "y" or "n" >> ');
        if (hardMode === 'y') {
            this.hardMode = true;
            console.log('Game is set to Hard (holes are hidden after the first move).');
        }
        else {
            console.log('Game set to normal (holes are always visible).');
        }
        console.log("Select a WASD control and press enter to navigate the map and find your hat!");
        this.gameActive = true;
        while (this.gameActive) {
            this.playTurn();
        }
    };
    Field.prototype.printField = function () {
        if (this.gameGrid === undefined) {
            console.log('This method cannot be used until a game grid has been provided');
            return;
        }
        for (var _i = 0, _a = this.gameGrid; _i < _a.length; _i++) {
            var row = _a[_i];
            console.log(row.join(''));
        }
    };
    Field.prototype.printVictory = function () {
        var victoryArray = [
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
        for (var _i = 0, victoryArray_1 = victoryArray; _i < victoryArray_1.length; _i++) {
            var row = victoryArray_1[_i];
            console.log(row.join(''));
        }
    };
    Field.prototype.playTurn = function () {
        this.printField();
        if (this.hardMode && !this.holesHidden) {
            this.hideHoles();
        }
        var direction = prompt('Which direction would you like to move? >> ');
        this.move(direction);
    };
    //for use when this.hardMode is set to true
    Field.prototype.hideHoles = function () {
        if (this.gameGrid === undefined) {
            throw new Error('Game Grid must already be provided');
        }
        for (var _i = 0, _a = this.holes; _i < _a.length; _i++) {
            var _b = _a[_i], row = _b[0], column = _b[1];
            this.gameGrid[row][column] = Character.Field;
        }
        this.holesHidden = true;
    };
    Field.prototype.move = function (direction) {
        if (this.gameGrid === undefined) {
            throw new Error('This method cannot be used until a game grid has been provided');
        }
        switch (direction) {
            case 'a':
                this.moveLeft();
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
    };
    Field.prototype.moveLeft = function () {
        if (this.gameGrid === undefined) {
            throw new Error('This method cannot be used until a game grid has been provided');
        }
        var newPosition = [this.playerRowPosition, this.playerColumnPosition - 1];
        if (this.meetsEndConditions(newPosition)) {
            return;
        }
        //set last position to path
        this.gameGrid[this.playerRowPosition][this.playerColumnPosition] = Character.Path;
        //set new position to player
        this.playerColumnPosition -= 1;
        this.gameGrid[this.playerRowPosition][this.playerColumnPosition] = Character.Player;
    };
    Field.prototype.moveRight = function () {
        if (this.gameGrid === undefined) {
            throw new Error('This method cannot be used until a game grid has been provided');
        }
        var newPosition = [this.playerRowPosition, this.playerColumnPosition + 1];
        if (this.meetsEndConditions(newPosition)) {
            return;
        }
        this.gameGrid[this.playerRowPosition][this.playerColumnPosition] = Character.Path;
        this.playerColumnPosition += 1;
        this.gameGrid[this.playerRowPosition][this.playerColumnPosition] = Character.Player;
    };
    Field.prototype.moveUp = function () {
        if (this.gameGrid === undefined) {
            throw new Error('This method cannot be used until a game grid has been provided');
        }
        var newPosition = [this.playerRowPosition - 1, this.playerColumnPosition];
        if (this.meetsEndConditions(newPosition)) {
            return;
        }
        this.gameGrid[this.playerRowPosition][this.playerColumnPosition] = Character.Path;
        this.playerRowPosition -= 1;
        this.gameGrid[this.playerRowPosition][this.playerColumnPosition] = Character.Player;
    };
    Field.prototype.moveDown = function () {
        if (this.gameGrid === undefined) {
            throw new Error('This method cannot be used until a game grid has been provided');
        }
        var newPosition = [this.playerRowPosition + 1, this.playerColumnPosition];
        if (this.meetsEndConditions(newPosition)) {
            return;
        }
        this.gameGrid[this.playerRowPosition][this.playerColumnPosition] = Character.Path;
        this.playerRowPosition += 1;
        this.gameGrid[this.playerRowPosition][this.playerColumnPosition] = Character.Player;
    };
    Field.prototype.meetsEndConditions = function (newPosition) {
        if (this.gameGrid === undefined) {
            throw new Error('This method cannot be used until a game grid has been provided');
        }
        var newPositionRow = newPosition[0], newPositionColumn = newPosition[1];
        var stringifiedPosition = JSON.stringify(newPosition);
        if (newPositionRow < 0 || newPositionRow > this.fieldHeight - 1 || newPositionColumn < 0 || newPositionColumn > this.fieldWidth - 1) {
            this.gameOver(GameOverReason.OutOfBounds);
            return true;
        }
        else if (this.gameGrid[newPositionRow][newPositionColumn] === Character.Hat) {
            this.gameOver(GameOverReason.Win);
            return true;
        }
        else if (this.holes.find(function (element) { return JSON.stringify(element) === stringifiedPosition; })) {
            this.gameOver(GameOverReason.FellInHole);
            return true;
        }
        else {
            return false;
        }
    };
    Field.prototype.gameOver = function (reason) {
        switch (reason) {
            case GameOverReason.OutOfBounds:
                console.log('You went out of bounds! Game Over.');
                this.gameActive = false;
                return GameOverReason.OutOfBounds;
            case GameOverReason.FellInHole:
                console.log('You fell down a hole! Game Over.');
                this.gameActive = false;
                return GameOverReason.FellInHole;
            default:
                this.printVictory();
                console.log('You found your hat! Thank God. Victory!');
                this.gameActive = false;
                return GameOverReason.Win;
        }
    };
    return Field;
}());
module.exports.Field = Field;
