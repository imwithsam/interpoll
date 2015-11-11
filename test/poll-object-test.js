const Choice = require('../lib/choice');
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

  it('has an admin url', function() {
    var poll1 = new Poll();
    var url = poll1.adminUrl;
    var id = poll1.id;

    assert.equal(`http://localhost:3000/${id}`, url);
  });

  it('has a voter url', function() {
    var poll1 = new Poll();
    var poll2 = new Poll();
    var url1 = poll1.voterUrl;
    var url2 = poll2.voterUrl;

    assert.notEqual(url1, url2);
  });

  it('has different voter and admin urls', function() {
    var poll1 = new Poll();
    var adminUrl = poll1.adminUrl;
    var voterUrl = poll1.voterUrl;

    assert.notEqual(adminUrl, voterUrl);
  });

  it('has a question field', function() {
    var poll = new Poll();

    assert.isDefined(poll.question);
  });

  it('has choices', function() {
    var poll = new Poll();
    var choice1 = new Choice();
    var choice2 = new Choice();
    poll.choices.push(choice1, choice2);

    assert.deepEqual([choice1, choice2], poll.choices);
  });
});
