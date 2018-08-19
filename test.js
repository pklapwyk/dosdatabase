const operations = require('./operations.js')
const assert = require('assert');

it('correctly calculates the sum of 1 and 3', ()=> {
    assert.equal(operations.add(1, 3), 4)
});