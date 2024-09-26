const assert = require('assert');
const { Field } = require('../FieldClass');

const playerCharacter = '!';
const hatCharacter = '^';
const holeCharacter = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

describe('Field', () => {
    describe('.getRandomKeyPosition', () => {

        let field, rowIndex, columnIndex;
        beforeEach(() => {
            fieldGame = new Field();
            rowIndex = 0;
            columnIndex = 1;
        })

        it('generates a valid random position array [row, column] on the game map when height is 1 and width is 1', () => {
            //setup
            const height = 1;
            const width = 1;

            //exercise
            const result = fieldGame.getRandomKeyPosition(height, width);

            //verify
            assert.ok(
                (result[rowIndex] >= 0 && result[rowIndex] <= height) 
                && 
                (result[columnIndex] >= 0 && result[columnIndex] <= width)
            );
        })

        it('generates a valid random position array [row, column] on the game map when height is 10 and width is 10', () => {
            //setup
            const height = 10;
            const width = 10;

            //exercise
            const result = fieldGame.getRandomKeyPosition(height, width);

            //verify
            assert.ok(
                (result[rowIndex] >= 0 && result[rowIndex] <= height) 
                && 
                (result[columnIndex] >= 0 && result[columnIndex] <= width)
            );
        })

        it('generates a valid random position array [row, column] on the game map when height is 100 and width is 100', () => {
            //setup
            const height = 100;
            const width = 100;

            //exercise
            const result = fieldGame.getRandomKeyPosition(height, width);

            //verify
            assert.ok(
                (result[rowIndex] >= 0 && result[rowIndex] <= height) 
                && 
                (result[columnIndex] >= 0 && result[columnIndex] <= width)
            );
        })

        it('generates a valid random position array [row, column] on the game map when height is 3 and width is 9', () => {
            //setup
            const height = 3;
            const width = 9;

            //exercise
            const result = fieldGame.getRandomKeyPosition(height, width);

            //verify
            assert.ok(
                (result[rowIndex] >= 0 && result[rowIndex] <= height) 
                && 
                (result[columnIndex] >= 0 && result[columnIndex] <= width)
            );
        })

        it('generates a valid random position array [row, column] on the game map when height is 9 and width is 3', () => {
            //setup
            const height = 9;
            const width = 3;

            //exercise
            const result = fieldGame.getRandomKeyPosition(height, width);

            //verify
            assert.ok(
                (result[rowIndex] >= 0 && result[rowIndex] <= height) 
                && 
                (result[columnIndex] >= 0 && result[columnIndex] <= width)
            );
        })

        it('throws an error if it is passed a height that is less than 1', () => {
            //setup
            const height = -1;
            const width = 10;

            //exercise
            const result = () => fieldGame.getRandomKeyPosition(height, width);
    

            //verify
            assert.throws(result, /Height and width values cannot be less than 1/)
        })

        it('throws an error if it is passed a width that is less than 1', () => {
            //setup
            const height = 10;
            const width = -1;

            //exercise
            const result = () => fieldGame.getRandomKeyPosition(height, width);
    

            //verify
            assert.throws(result, /Height and width values cannot be less than 1/)
        })
    })

    describe('.setHatPosition', () => {

        let fieldGame;
        beforeEach(() => {
            fieldGame = new Field();

            //generate and assign gameGrid for field instance
            const fieldHeight = 10;
            const fieldWidth = 50;
            const percentageHoles = 20;
            const playerRandom = true;
            const hatRandom = true;
            fieldGame.gameGrid = fieldGame.generateField(fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom);
        })

        it('throws an error if the field instance\'s gameGrid property is undefined', () => {
            //setup
            fieldGame.gameGrid = undefined;

            //exercise
            const result = () => fieldGame.setHatPosition();

            //verify
            assert.throws(result, /Game Grid must already be provided/);
        })

        it('sets the instance\'s hatRowPosition and hatColumnPosition with the correct values when called', () => {
            //setup
            fieldGame.setHatPosition();

            //exercise
            const result = fieldGame.gameGrid[fieldGame.hatRowPosition][fieldGame.hatColumnPosition];

            //verify
            assert.strictEqual(result, hatCharacter);
        })
    })

    describe('.setPlayerPosition', () => {

        let fieldGame;
        beforeEach(() => {
            fieldGame = new Field();

            //generate and assign gameGrid for field instance
            const fieldHeight = 10;
            const fieldWidth = 50;
            const percentageHoles = 20;
            const playerRandom = true;
            const hatRandom = true;
            fieldGame.gameGrid = fieldGame.generateField(fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom);
            

        })

        it('throws an error if the field instance\'s gameGrid property is undefined', () => {
            //setup
            fieldGame.gameGrid = undefined;

            //exercise
            const result = () => fieldGame.setPlayerPosition();

            //verify
            assert.throws(result, /Game Grid must already be provided/);
        })

        it('sets the instance\'s playerRowPosition and playerColumnPosition with the correct values when called', () => {
            //setup
            fieldGame.setPlayerPosition();

            //exercise
            const result = fieldGame.gameGrid[fieldGame.playerRowPosition][fieldGame.playerColumnPosition];

            //verify
            assert.strictEqual(result, playerCharacter);
        })
    })

    describe('.setFieldDimensions', () => {

        let fieldGame;
        beforeEach(() => {
            fieldGame = new Field();
        })
        
        it('throws an error if the field instance\'s gameGrid property is undefined', () => {
            //setup
            fieldGame.gameGrid = undefined;

            //exercise
            const result = () => fieldGame.setFieldDimensions();

            //verify
            assert.throws(result, /Game Grid must already be provided/);
        })

        it('correctly sets the field\'s dimensions when called and a custom game field has been provided', () => {
            //setup
            fieldGame.gameGrid = [
                ['*', '░', 'O'],
                ['░', 'O', '░'],
                ['░', '^', '░']
            ];
            const expectedFieldWidth = fieldGame.gameGrid[0].length;
            const expectedFieldHeight = fieldGame.gameGrid.length;

            //exercise
            fieldGame.setFieldDimensions();
            const fieldWidthResult = fieldGame.fieldWidth;
            const fieldHeightResult = fieldGame.fieldHeight;
            

            //verify
            assert.strictEqual(expectedFieldWidth, fieldWidthResult);
            assert.strictEqual(expectedFieldHeight, fieldHeightResult);
        })
    })

    describe('.setHoles', () => {

        let fieldGame;
        beforeEach(() => {
            fieldGame = new Field();
        })
        
        it('throws an error if the field instance\'s gameGrid property is undefined', () => {
            //setup
            fieldGame.gameGrid = undefined;

            //exercise
            const result = () => fieldGame.setHoles();

            //verify
            assert.throws(result, /Game Grid must already be provided/);
        })

        it('correctly sets the field\'s hole positions when called and a custom game field has been provided', () => {
            //setup
            fieldGame.gameGrid = [
                ['*', '░', 'O'],
                ['░', 'O', 'O'],
                ['░', '^', 'O']
            ];
            const expectedHolePositions = [[0, 2], [1, 1], [1, 2], [2, 2]];

            //exercise
            fieldGame.setHoles();
            const resultHolePositions = fieldGame.holes;
            

            //verify
            assert.deepEqual(expectedHolePositions, resultHolePositions);
        })
    })

    describe('populateRandomHoles', () => {

        let fieldGame, field, percentageHoles;
        beforeEach(() => {
            fieldGame = new Field();
            field = [
                ['*', '░', '░'],
                ['░', '░', '░'],
                ['░', '░', '░'],
                ['░', '░', '░'],
                ['░', '░', '░'],
                ['░', '^', '░']
            ];
            fieldGame.fieldHeight = field.length;
            fieldGame.fieldWidth = field[0].length;
            percentageHoles = 20;

            
        })
        
        it('accurately updates the instance\'s holes property with [row, column] positions as it determines spots to be holes', () => {
            //setup
            percentageHoles = 20;
            fieldGame.populateRandomHoles(field, percentageHoles);
            const resultHolePositions = fieldGame.holes;
            let testPass = true;

            //exercise
            for (let row = 0; row < field.length; row++) {
                for (let column = 0; column < field[row].length; column++) {
                    let stringifiedPosition = JSON.stringify([row, column]);
                    if (field[row][column] === holeCharacter && !resultHolePositions.find((element) => JSON.stringify(element) === stringifiedPosition)) {
                        testPass = false;
                        break;
                    } else if (field[row][column] !== holeCharacter && resultHolePositions.find((element) => JSON.stringify(element) === stringifiedPosition)) {
                        testPass = false;
                        break;
                    }
                }
            }
            
            //verify
            assert.ok(testPass);
        })

        it('sets an amount of holes equal to the floored percentage of holes allowed by the passed percentageHoles parameter', () => {
            //setup
            percentageHoles = 60;
            fieldGame.populateRandomHoles(field, percentageHoles);
            let resultNumberHoles = 0;
            const expectedNumberHoles = Math.floor(((fieldGame.fieldHeight * fieldGame.fieldWidth) - 2) * (percentageHoles / 100)); //9

            //exercise
            for (let row = 0; row < field.length; row++) {
                for (let column = 0; column < field[row].length; column++) {
                    if (field[row][column] === holeCharacter) {
                        resultNumberHoles++;
                    }
                }
            }
            
            //verify
            assert.deepEqual(resultNumberHoles, expectedNumberHoles);
        })
    })
    
    describe('.generateField', () => {

        let fieldGame, fieldHeight, fieldWidth, percentageHoles, playerRandom;
        beforeEach(() => {
            fieldGame = new Field();
            //give method arguments default values. Can reassign as necessary
            fieldHeight = 10;
            fieldWidth = 10;
            percentageHoles = 20;
            playerRandom = true;
            hatRandom = true;
        })

        it('assigns the fieldWidth and fieldHeight arguments to be the fieldHeight and fieldWidth of the Field instance', () => {
            //setup
            fieldHeight = 10;
            fieldWidth = 20;
            const expectedHeight = fieldHeight;
            const expectedWidth = fieldWidth;
            //exercise
            fieldGame.generateField(fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom);
            const heightResult = fieldGame.fieldHeight;
            const widthResult = fieldGame.fieldWidth;
            //verify
            assert.strictEqual(heightResult, expectedHeight);
            assert.strictEqual(widthResult, expectedWidth);
        })

        it('sets the player in a random starting position if "playerRandom" is set to true and sets path character in that starting position', () => {
            //setup
            playerRandom = true;
            const defaultPlayerPosition = 0;
            let potentialFailures = 0;
            //exercise
            for (let i = 0; i < 3; i++) {
                //if resulting position is the default position 3 times, conclude randomization of player position is failing
                fieldGame.gameGrid = fieldGame.generateField(fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom);
                let playerRowPositionResult = fieldGame.playerRowPosition;
                let playerColumnPositionResult = fieldGame.playerColumnPosition;

                if (playerRowPositionResult === defaultPlayerPosition && playerColumnPositionResult === defaultPlayerPosition) {
                    potentialFailures++;
                }

            }

            //verify
            assert.ok(potentialFailures <= 3);
            assert.strictEqual(fieldGame.gameGrid[fieldGame.playerRowPosition][fieldGame.playerColumnPosition], playerCharacter);
        })

        it('sets the player in the default starting position (top left) if "playerRandom" is set to false', () => {
            //setup
            playerRandom = false;
            const defaultPlayerPosition = 0;
            //exercise
            fieldGame.gameGrid = fieldGame.generateField(fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom);

            //verify
            assert.strictEqual(fieldGame.gameGrid[defaultPlayerPosition][defaultPlayerPosition], playerCharacter);
        })

        it('sets the hat in a random position if "hatRandom" is set to true and sets hat character in that position', () => {
            //setup
            hatRandom = true;
            const defaultHatRowPosition = fieldHeight - 1;
            const defaultHatColumnPosition = fieldWidth - 2;
            let potentialFailures = 0;

            //exercise
            for (let i = 0; i < 3; i++) {
                //if resulting position is the default position 3 times, conclude randomization of hat position is failing
                fieldGame.gameGrid = fieldGame.generateField(fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom);

                if (fieldGame.hatRowPosition === defaultHatRowPosition && fieldGame.hatColumnPosition === defaultHatColumnPosition) {
                    potentialFailures++;
                }

            }

            //verify
            assert.ok(potentialFailures <= 3);
            assert.strictEqual(fieldGame.gameGrid[fieldGame.hatRowPosition][fieldGame.hatColumnPosition], hatCharacter);
        })

        it('never sets the hat and the player in the same position when "hatRandom" and "playerRandom" are set to true', () => {
            //setup
            hatRandom = true;
            playerRandom = true;
            fieldHeight = 2;
            fieldWidth = 1;
            let failure = false;
            //exercise
            for (let i = 0; i < 10; i++) {
                fieldGame.generateField(fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom);
                 
                if (fieldGame.hatRowPosition === fieldGame.playerRowPosition && fieldGame.hatColumnPosition === fieldGame.playerColumnPosition) {
                    failure = true;
                    break;
                }
            }

            //verify
            assert.strictEqual(failure, false);
        })

        it('never sets the hat and the player in the same position when "hatRandom" is set to true and "playerRandom" is set to false', () => {
            //setup
            hatRandom = true;
            playerRandom = false;
            fieldHeight = 2;
            fieldWidth = 1;
            let failure = false;
            let hatPosition = [];
            //exercise
            for (let i = 0; i < 10; i++) {
                //if resulting position is the default position 3 times, conclude randomization of hat position is failing
                fieldGame.gameGrid = fieldGame.generateField(fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom);

                 
                if (fieldGame.hatRowPosition === fieldGame.playerRowPosition && fieldGame.hatColumnPosition === fieldGame.playerColumnPosition) {
                    failure = true;
                    break;
                }

            }

            //verify
            assert.strictEqual(failure, false);
        })

        it('sets the hat in the default position (second to last of bottom row) if "hatRandom" is set to false', () => {
            //setup
            hatRandom = false;
            const defaultHatRowPosition = fieldHeight - 1;
            const defaultHatColumnPosition = fieldWidth - 2;
            //exercise
            fieldGame.gameGrid = fieldGame.generateField(fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom);

            //verify
            assert.strictEqual(fieldGame.gameGrid[defaultHatRowPosition][defaultHatColumnPosition], hatCharacter);
            assert.strictEqual(fieldGame.hatRowPosition, defaultHatRowPosition);
            assert.strictEqual(fieldGame.hatColumnPosition, defaultHatColumnPosition);
        })

        
    })

    describe('hideHoles', () => {
        let fieldGame, fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom;
        beforeEach(() => {
            fieldGame = new Field();

            fieldHeight = 10;
            fieldWidth = 10;
            percentageHoles = 50;
            playerRandom = true;
            hatRandom = true;
        })

        it('hides all holes and only holes by replacing them with field characters', () => {
            //setup
            fieldGame.gameGrid = fieldGame.generateField(fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom);
            let expectedPlayerCount = 1;
            let expectedHatCount = 1;
            let expectedHoleCount = 0;

            //exercise
            fieldGame.hideHoles();
            let resultPlayerCount = 0;
            let resultHatCount = 0;
            let resultHoleCount = 0;
            for (let row of fieldGame.gameGrid) {
                for (let column of row) {
                    if (column === playerCharacter) resultPlayerCount++;
                    if (column === hatCharacter) resultHatCount++;
                    if (column === holeCharacter) resultHoleCount++;
                }
            }

            //verify
            assert.strictEqual(expectedPlayerCount, resultPlayerCount);
            assert.strictEqual(expectedHatCount, resultHatCount);
            assert.strictEqual(expectedHoleCount, resultHoleCount);

        })



        it('throws an error if called and no gameGrid has been defined', () => {
            //setup
            fieldGame.gameGrid = undefined;

            //exercise
            const result = () => fieldGame.hideHoles();

            //verify
            assert.throws(result, /Game Grid must already be provided/);
        })
    })

    describe('move', () => {
        
        let fieldGame;
        beforeEach(() => {
            fieldGame = new Field();
            fieldGame.gameGrid = [
                ['░', '░', '░'],
                ['░', '!', '░'],
                ['░', '░', '░']
            ];
            fieldGame.setPlayerPosition();
            fieldGame.setFieldDimensions();
        })

        it('moves the player character left one position when the direction parameter is "a" and leaves a path character in the previous position', () => {
            //setup
            const expectedPlayerPosition = [1, 0];
            const expectedPathPosition = [1, 1];
            

            //exercise
            fieldGame.move('a');
            const resultPlayerPosition = [fieldGame.playerRowPosition, fieldGame.playerColumnPosition];
            const resultPathPosition = [];
            for (let row = 0; row < fieldGame.gameGrid.length; row++) {
                for (let column = 0; column < fieldGame.gameGrid[row].length; column++) {
                    if (fieldGame.gameGrid[row][column] === pathCharacter) {
                        [resultPathPosition[0], resultPathPosition[1]] = [row, column];
                    }
                }
            }

            //verify
            assert.deepEqual(expectedPlayerPosition, resultPlayerPosition);
            assert.deepEqual(expectedPathPosition, resultPathPosition);
        })

        it('moves the player character right one position when the direction parameter is "d" and leaves a path character in the previous position', () => {
            //setup
            const expectedPlayerPosition = [1, 2];
            const expectedPathPosition = [1, 1];
            

            //exercise
            fieldGame.move('d');
            const resultPlayerPosition = [fieldGame.playerRowPosition, fieldGame.playerColumnPosition];
            const resultPathPosition = [];
            for (let row = 0; row < fieldGame.gameGrid.length; row++) {
                for (let column = 0; column < fieldGame.gameGrid[row].length; column++) {
                    if (fieldGame.gameGrid[row][column] === pathCharacter) {
                        [resultPathPosition[0], resultPathPosition[1]] = [row, column];
                    }
                }
            }

            //verify
            assert.deepEqual(expectedPlayerPosition, resultPlayerPosition);
            assert.deepEqual(expectedPathPosition, resultPathPosition);
        })

        it('moves the player character up one position when the direction parameter is "w" and leaves a path character in the previous position', () => {
            //setup
            const expectedPlayerPosition = [0, 1];
            const expectedPathPosition = [1, 1];
            

            //exercise
            fieldGame.move('w');
            const resultPlayerPosition = [fieldGame.playerRowPosition, fieldGame.playerColumnPosition];
            const resultPathPosition = [];
            for (let row = 0; row < fieldGame.gameGrid.length; row++) {
                for (let column = 0; column < fieldGame.gameGrid[row].length; column++) {
                    if (fieldGame.gameGrid[row][column] === pathCharacter) {
                        [resultPathPosition[0], resultPathPosition[1]] = [row, column];
                    }
                }
            }

            //verify
            assert.deepEqual(expectedPlayerPosition, resultPlayerPosition);
            assert.deepEqual(expectedPathPosition, resultPathPosition);
        })

        it('moves the player character down one position when the direction parameter is "s" and leaves a path character in the previous position', () => {
            //setup
            const expectedPlayerPosition = [2, 1];
            const expectedPathPosition = [1, 1];
            

            //exercise
            fieldGame.move('s');
            const resultPlayerPosition = [fieldGame.playerRowPosition, fieldGame.playerColumnPosition];
            const resultPathPosition = [];
            for (let row = 0; row < fieldGame.gameGrid.length; row++) {
                for (let column = 0; column < fieldGame.gameGrid[row].length; column++) {
                    if (fieldGame.gameGrid[row][column] === pathCharacter) {
                        [resultPathPosition[0], resultPathPosition[1]] = [row, column];
                    }
                }
            }

            //verify
            assert.deepEqual(expectedPlayerPosition, resultPlayerPosition);
            assert.deepEqual(expectedPathPosition, resultPathPosition);
        })
        
        it('it does not move the character if the direction parameter is not a valid WASD input', () => {
            //setup
            const expectedPlayerPosition = [1, 1];
            const expectedPathCount = 0;
            

            //exercise
            fieldGame.move('invalid input');
            const resultPlayerPosition = [fieldGame.playerRowPosition, fieldGame.playerColumnPosition];
            const resultPathCount = 0;
            for (let row = 0; row < fieldGame.gameGrid.length; row++) {
                for (let column = 0; column < fieldGame.gameGrid[row].length; column++) {
                    if (fieldGame.gameGrid[row][column] === pathCharacter) {
                        resultPathCount = 1;
                    }
                }
            }

            //verify
            assert.deepEqual(expectedPlayerPosition, resultPlayerPosition);
            assert.strictEqual(expectedPathCount, resultPathCount);
        })
        

        it('throws an error if gameGrid has not been defined yet', () => {
            //setup
            fieldGame.gameGrid = undefined;

            //exercise
            const result = () => fieldGame.move();

            //verify
            assert.throws(result, /This method cannot be used until a game grid has been provided/);
        })
    })

    describe('moveLeft', () => {

        let fieldGame;
        beforeEach(() => {
            fieldGame = new Field();
            fieldGame.gameGrid = [
                ['░', '░', '░'],
                ['░', playerCharacter, '░'],
                ['░', '░', '░']
            ];
            fieldGame.setPlayerPosition();
            fieldGame.setFieldDimensions();
        })

        it('moves the player down one position and leaves a path character in previous position', () => {
            //setup
            const expectedPlayerPosition = [1, 0];
            const expectedPathPosition = [1, 1];
            

            //exercise
            fieldGame.moveLeft();
            const resultPlayerPosition = [fieldGame.playerRowPosition, fieldGame.playerColumnPosition];
            const resultPathPosition = [];
            for (let row = 0; row < fieldGame.gameGrid.length; row++) {
                for (let column = 0; column < fieldGame.gameGrid[row].length; column++) {
                    if (fieldGame.gameGrid[row][column] === pathCharacter) {
                        [resultPathPosition[0], resultPathPosition[1]] = [row, column];
                    }
                }
            }

            //verify
            assert.deepEqual(expectedPlayerPosition, resultPlayerPosition);
            assert.deepEqual(expectedPathPosition, resultPathPosition);
        })

        it('ends the game and does not move the player\'s position left if the new position satisfies game\'s end conditions', () => {
            //setup
            fieldGame.gameGrid[1][0] = holeCharacter;
            fieldGame.setHoles();
            const expectedPlayerPosition = [1, 1];

            //exercise
            fieldGame.moveLeft();
            const resultPlayerPosition = [fieldGame.playerRowPosition, fieldGame.playerColumnPosition];

            //verify
            assert.deepEqual(expectedPlayerPosition, resultPlayerPosition);
        })

        it('throws an error if gameGrid has not been defined yet', () => {
            //setup
            fieldGame.gameGrid = undefined;

            //exercise
            const result = () => fieldGame.moveLeft();

            //verify
            assert.throws(result, /This method cannot be used until a game grid has been provided/);
        })
    })

    describe('moveRight', () => {

        let fieldGame;
        beforeEach(() => {
            fieldGame = new Field();
            fieldGame.gameGrid = [
                ['░', '░', '░'],
                ['░', playerCharacter, '░'],
                ['░', '░', '░']
            ];
            fieldGame.setPlayerPosition();
            fieldGame.setFieldDimensions();
        })

        it('moves the player right one position and leaves a path character in previous position', () => {
            //setup
            const expectedPlayerPosition = [1, 2];
            const expectedPathPosition = [1, 1];
            

            //exercise
            fieldGame.moveRight();
            const resultPlayerPosition = [fieldGame.playerRowPosition, fieldGame.playerColumnPosition];
            const resultPathPosition = [];
            for (let row = 0; row < fieldGame.gameGrid.length; row++) {
                for (let column = 0; column < fieldGame.gameGrid[row].length; column++) {
                    if (fieldGame.gameGrid[row][column] === pathCharacter) {
                        [resultPathPosition[0], resultPathPosition[1]] = [row, column];
                    }
                }
            }
            
            //verify
            assert.deepEqual(expectedPlayerPosition, resultPlayerPosition);
            assert.deepEqual(expectedPathPosition, resultPathPosition);
        })

        it('ends the game and does not move the player\'s position right if the new position satisfies game\'s end conditions', () => {
            //setup
            fieldGame.gameGrid[1][2] = hatCharacter;
            fieldGame.setHatPosition();
            const expectedPlayerPosition = [1, 1];

            //exercise
            fieldGame.moveRight();
            const resultPlayerPosition = [fieldGame.playerRowPosition, fieldGame.playerColumnPosition];

            //verify
            assert.deepEqual(expectedPlayerPosition, resultPlayerPosition);
        })

        it('throws an error if gameGrid has not been defined yet', () => {
            //setup
            fieldGame.gameGrid = undefined;

            //exercise
            const result = () => fieldGame.moveRight();

            //verify
            assert.throws(result, /This method cannot be used until a game grid has been provided/);
        })
    })

    describe('moveUp', () => {

        let fieldGame;
        beforeEach(() => {
            fieldGame = new Field();
            fieldGame.gameGrid = [
                ['░', '░', '░'],
                ['░', playerCharacter, '░'],
                ['░', '░', '░']
            ];
            fieldGame.setPlayerPosition();
            fieldGame.setFieldDimensions();
        })

        it('moves the player down up position and leaves a path character in previous position', () => {
            //setup
            const expectedPlayerPosition = [0, 1];
            const expectedPathPosition = [1, 1];
            

            //exercise
            fieldGame.moveUp();
            const resultPlayerPosition = [fieldGame.playerRowPosition, fieldGame.playerColumnPosition];
            const resultPathPosition = [];
            for (let row = 0; row < fieldGame.gameGrid.length; row++) {
                for (let column = 0; column < fieldGame.gameGrid[row].length; column++) {
                    if (fieldGame.gameGrid[row][column] === pathCharacter) {
                        [resultPathPosition[0], resultPathPosition[1]] = [row, column];
                    }
                }
            }

            //verify
            assert.deepEqual(expectedPlayerPosition, resultPlayerPosition);
            assert.deepEqual(expectedPathPosition, resultPathPosition);
        })

        it('ends the game and does not move the player\'s position up if the new position satisfies game\'s end conditions', () => {
            //setup
            fieldGame.gameGrid[0][1] = hatCharacter;
            fieldGame.setHatPosition();
            const expectedPlayerPosition = [1, 1];

            //exercise
            fieldGame.moveUp();
            const resultPlayerPosition = [fieldGame.playerRowPosition, fieldGame.playerColumnPosition];

            //verify
            assert.deepEqual(expectedPlayerPosition, resultPlayerPosition);
        })

        it('throws an error if gameGrid has not been defined yet', () => {
            //setup
            fieldGame.gameGrid = undefined;

            //exercise
            const result = () => fieldGame.moveUp();

            //verify
            assert.throws(result, /This method cannot be used until a game grid has been provided/);
        })
    })

    describe('moveDown', () => {

        let fieldGame;
        beforeEach(() => {
            fieldGame = new Field();
            fieldGame.gameGrid = [
                ['░', '░', '░'],
                ['░', playerCharacter, '░'],
                ['░', '░', '░']
            ];
            fieldGame.setPlayerPosition();
            fieldGame.setFieldDimensions();
        })

        it('moves the player down one position and leaves a path character in previous position', () => {
            //setup
            const expectedPlayerPosition = [2, 1];
            const expectedPathPosition = [1, 1];
            

            //exercise
            fieldGame.moveDown();
            const resultPlayerPosition = [fieldGame.playerRowPosition, fieldGame.playerColumnPosition];
            const resultPathPosition = [];
            for (let row = 0; row < fieldGame.gameGrid.length; row++) {
                for (let column = 0; column < fieldGame.gameGrid[row].length; column++) {
                    if (fieldGame.gameGrid[row][column] === pathCharacter) {
                        [resultPathPosition[0], resultPathPosition[1]] = [row, column];
                    }
                }
            }

            //verify
            assert.deepEqual(expectedPlayerPosition, resultPlayerPosition);
            assert.deepEqual(expectedPathPosition, resultPathPosition);
        })

        it('ends the game and does not move the player\'s position down if the new position satisfies game\'s end conditions', () => {
            //setup
            const expectedPlayerPosition = [2, 1];

            //exercise
            fieldGame.moveDown();
            fieldGame.moveDown();
            const resultPlayerPosition = [fieldGame.playerRowPosition, fieldGame.playerColumnPosition];

            //verify
            assert.deepEqual(expectedPlayerPosition, resultPlayerPosition);
        })

        it('throws an error if gameGrid has not been defined yet', () => {
            //setup
            fieldGame.gameGrid = undefined;

            //exercise
            const result = () => fieldGame.moveDown();

            //verify
            assert.throws(result, /This method cannot be used until a game grid has been provided/);
        })
    })

    describe('meetsEndConditions', () => {

        let fieldGame;
        beforeEach(() => {
            fieldGame = new Field();
            fieldGame.gameGrid = [
                ['░', '░', '░'],
                ['░', '░', hatCharacter],
                ['░', '░', holeCharacter]
            ];
            fieldGame.setFieldDimensions();
            fieldGame.setHoles();
        })

        it('returns true if newPosition parameter is out of the game map\'s bounds', () => {
            //setup
            const newPosition = [0, 4];
            const expectedResult = true;

            //exercise
            const actualResult = fieldGame.meetsEndConditions(newPosition);

            //verify
            assert.strictEqual(expectedResult, actualResult);

        })

        it('throws an error if gameGrid has not been defined yet', () => {
            //setup
            fieldGame.gameGrid = undefined;

            //exercise
            const result = () => fieldGame.meetsEndConditions();

            //verify
            assert.throws(result, /This method cannot be used until a game grid has been provided/);
        })
    })
})