const Poll = require('../lib/poll');
const assert = require('chai').assert;

describe('Poll', function() {
  it('exists', function() {
    var poll = new Poll();

    assert(poll);
  });

  it('has a unique id', function() {
    var poll1 = new Poll();
    var poll2 = new Poll();

    assert.notEqual(poll1.id, poll2.id);
  });
});
