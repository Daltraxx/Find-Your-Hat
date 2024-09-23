const assert = require('assert');
const { Field } = require('../FieldClass');

describe('Field', () => {
    describe('.getKeyPosition', () => {

        let field, rowIndex, columnIndex;
        beforeEach(() => {
            field = new Field();
            rowIndex = 0;
            columnIndex = 1;
        })

        it('generates a valid random position array [row, column] on the game map when height is 1 and width is 1', () => {
            //setup
            const height = 1;
            const width = 1;

            //exercise
            const result = field.getKeyPosition(height, width);

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
            const result = field.getKeyPosition(height, width);

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
            const result = field.getKeyPosition(height, width);

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
            const result = field.getKeyPosition(height, width);

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
            const result = field.getKeyPosition(height, width);

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
            const result = () => field.getKeyPosition(height, width);
    

            //verify
            assert.throws(result, /Height and width values cannot be less than 1/)
        })

        it('throws an error if it is passed a width that is less than 1', () => {
            //setup
            const height = 10;
            const width = -1;

            //exercise
            const result = () => field.getKeyPosition(height, width);
    

            //verify
            assert.throws(result, /Height and width values cannot be less than 1/)
        })
    })

    describe('.setHatPosition', () => {

        let field;
        beforeEach(() => {
            field = new Field();

            //generate and assign gameGrid for field instance
            const fieldHeight = 10;
            const fieldWidth = 50;
            const percentageHoles = 20;
            const playerRandom = true;
            const hatRandom = true;
            field.gameGrid = field.generateField(fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom);
            
            hat = '^';
        })

        it('throws an error if the field instance\'s gameGrid property is undefined', () => {
            //setup
            field.gameGrid = undefined;

            //exercise
            const result = () => field.setHatPosition();

            //verify
            assert.throws(result, /Game Grid must already be provided/);
        })

        it('sets the instance\'s hatRowPosition and hatColumnPosition with the correct values when called', () => {
            //setup
            field.setHatPosition();

            //exercise
            const result = field.gameGrid[field.hatRowPosition][field.hatColumnPosition];

            //verify
            assert.strictEqual(result, hat);
        })
    })

    describe('.setPlayerPosition', () => {

        let field, player;
        beforeEach(() => {
            field = new Field();

            //generate and assign gameGrid for field instance
            const fieldHeight = 10;
            const fieldWidth = 50;
            const percentageHoles = 20;
            const playerRandom = true;
            const hatRandom = true;
            field.gameGrid = field.generateField(fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom);
            
            player = '*';
        })

        it('throws an error if the field instance\'s gameGrid property is undefined', () => {
            //setup
            field.gameGrid = undefined;

            //exercise
            const result = () => field.setPlayerPosition();

            //verify
            assert.throws(result, /Game Grid must already be provided/);
        })

        it('sets the instance\'s playerRowPosition and playerColumnPosition with the correct values when called', () => {
            //setup
            field.setPlayerPosition();

            //exercise
            const result = field.gameGrid[field.playerRowPosition][field.playerColumnPosition];

            //verify
            assert.strictEqual(result, player);
        })
    })

    describe('.setFieldDimensions', () => {

        let field;
        beforeEach(() => {
            field = new Field();
        })
        
        it('throws an error if the field instance\'s gameGrid property is undefined', () => {
            //setup
            field.gameGrid = undefined;

            //exercise
            const result = () => field.setFieldDimensions();

            //verify
            assert.throws(result, /Game Grid must already be provided/);
        })

        it('correctly sets the field\'s dimensions when called and a custom game field has been provided', () => {
            //setup
            field.gameGrid = [
                ['*', '░', 'O'],
                ['░', 'O', '░'],
                ['░', '^', '░']
            ];
            const expectedFieldWidth = field.gameGrid[0].length;
            const expectedFieldHeight = field.gameGrid.length;

            //exercise
            field.setFieldDimensions();
            const fieldWidthResult = field.fieldWidth;
            const fieldHeightResult = field.fieldHeight;
            

            //verify
            assert.strictEqual(expectedFieldWidth, fieldWidthResult);
            assert.strictEqual(expectedFieldHeight, fieldHeightResult);
        })
    })

    describe('.setHoles', () => {

        let field;
        beforeEach(() => {
            field = new Field();
        })
        
        it('throws an error if the field instance\'s gameGrid property is undefined', () => {
            //setup
            field.gameGrid = undefined;

            //exercise
            const result = () => field.setHoles();

            //verify
            assert.throws(result, /Game Grid must already be provided/);
        })

        it('correctly sets the field\'s hole positions when called and a custom game field has been provided', () => {
            //setup
            field.gameGrid = [
                ['*', '░', 'O'],
                ['░', 'O', 'O'],
                ['░', '^', 'O']
            ];
            const expectedHolePositions = [[0, 2], [1, 1], [1, 2], [2, 2]];

            //exercise
            field.setHoles();
            const resultHolePositions = field.holes;
            

            //verify
            assert.deepEqual(expectedHolePositions, resultHolePositions);
        })
    })

    describe('populateRandomHoles', () => {

        let fieldGame, field, percentageHoles, hat, hole, fieldCharacter, pathCharacter;
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

            hat = '^';
            hole = 'O';
            fieldCharacter = '░';
            pathCharacter = '*'
        })
        
        it('accurately updates the instance\'s holes property with [row, column] positions as it determines spots to be holes', () => {
            //setup
            percentageHoles = 20;
            fieldGame.populateRandomHoles(field, percentageHoles);
            const resultHolePositions = fieldGame.holes;
            const expectedHolePositions = [];

            //exercise
            for (let row = 0; row < field.length; row++) {
                for (let column = 0; column < field[row].length; column++) {
                    if (field[row][column] === hole) {
                        expectedHolePositions.push([row, column]);
                    }
                }
            }
            
            //verify
            assert.deepEqual(resultHolePositions, expectedHolePositions);
        })
    })

    
    describe('.generateField', () => {

        let field, fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom, hat, hole, fieldCharacter, pathCharacter;
        beforeEach(() => {
            field = new Field();
            //give method arguments default values. Can reassign as necessary
            fieldHeight = 10;
            fieldWidth = 10;
            percentageHoles = 20;
            playerRandom = true;
            hatRandom = true;
            //string characters that make up game map
            hat = '^';
            hole = 'O';
            fieldCharacter = '░';
            pathCharacter = '*';
        })

        it('assigns the fieldWidth and fieldHeight arguments to be the fieldHeight and fieldWidth of the Field instance', () => {
            //setup
            fieldHeight = 10;
            fieldWidth = 20;
            const expectedHeight = fieldHeight;
            const expectedWidth = fieldWidth;
            //exercise
            field.generateField(fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom);
            const heightResult = field.fieldHeight;
            const widthResult = field.fieldWidth;
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
                field.gameGrid = field.generateField(fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom);
                let playerRowPositionResult = field.playerRowPosition;
                let playerColumnPositionResult = field.playerColumnPosition;

                if (playerRowPositionResult === defaultPlayerPosition && playerColumnPositionResult === defaultPlayerPosition) {
                    potentialFailures++;
                }

            }

            //verify
            assert.ok(potentialFailures <= 3);
            assert.strictEqual(field.gameGrid[field.playerRowPosition][field.playerColumnPosition], pathCharacter);
        })

        it('sets the player in the default starting position (top left) if "playerRandom" is set to false', () => {
            //setup
            playerRandom = false;
            const defaultPlayerPosition = 0;
            //exercise
            field.gameGrid = field.generateField(fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom);

            //verify
            assert.strictEqual(field.gameGrid[defaultPlayerPosition][defaultPlayerPosition], pathCharacter);
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
                field.gameGrid = field.generateField(fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom);

                if (field.hatRowPosition === defaultHatRowPosition && field.hatColumnPosition === defaultHatColumnPosition) {
                    potentialFailures++;
                }

            }

            //verify
            assert.ok(potentialFailures <= 3);
            assert.strictEqual(field.gameGrid[field.hatRowPosition][field.hatColumnPosition], hat);
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
                field.generateField(fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom);
                 
                if (field.hatRowPosition === field.playerRowPosition && field.hatColumnPosition === field.playerColumnPosition) {
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
                field.gameGrid = field.generateField(fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom);

                 
                if (field.hatRowPosition === field.playerRowPosition && field.hatColumnPosition === field.playerColumnPosition) {
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
            field.gameGrid = field.generateField(fieldHeight, fieldWidth, percentageHoles, playerRandom, hatRandom);

            //verify
            assert.strictEqual(field.gameGrid[defaultHatRowPosition][defaultHatColumnPosition], hat);
            assert.strictEqual(field.hatRowPosition, defaultHatRowPosition);
            assert.strictEqual(field.hatColumnPosition, defaultHatColumnPosition);
        })

        
    })
})