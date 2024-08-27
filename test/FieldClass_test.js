const assert = require('assert');
const { Field } = require('../FieldClass');

describe('Field', () => {
    describe('.getKeyPosition', () => {
        it('generates a valid random position on the game map when height is 1 and width is 1', () => {
            //setup
            const field = new Field();
            const height = 1;
            const width = 1;
            const row = 0;
            const column = 1;

            //exercise
            const result = field.getKeyPosition(height, width);

            //verify
            assert.ok((result[row] >= 0 && result[row] <= height) && (result[column] >= 0 && result[column] <= width));
        })
    })
})