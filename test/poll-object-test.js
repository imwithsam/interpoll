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
    var choice1 = {};
    var choice2 = {};
    poll.choices.push(choice1, choice2);

    assert.deepEqual([{}, {}], poll.choices);
  });

  it('a choice has a description', function() {
    var poll = new Poll();
    var choice1 = {description: "good", voters: [1, 2, 3]};
    var choice2 = {description: "bad", voters: [4, 5, 6]};
    var choice3 = {description: "fair", voters: [7, 8, 9]};
    poll.choices.push(choice1, choice2, choice3);

    assert.equal("good", poll.choices[0].description);
  });

  it('a choice has an array of voter ids', function() {
    var poll = new Poll();
    var choice1 = {description: "good", voters: [1, 2, 3]};
    var choice2 = {description: "bad", voters: [4, 5, 6]};
    var choice3 = {description: "fair", voters: [7, 8, 9]};
    poll.choices.push(choice1, choice2, choice3);

    assert.equal(4, poll.choices[1].voters[0]);
  });

  it('has an addChoice method', function() {
    var poll = new Poll();
    poll.addChoice("good");

    assert.equal("good", poll.choices[0].description);
  });

  it('has an addVoteToChoice method', function() {
   var poll = new Poll();
   poll.addChoice("good");
   poll.addChoice("bad");
   poll.addChoice("ugly");
   poll.addVoteToChoice(1, 2);

   assert.deepEqual([1], poll.choices[2].voters);
   assert.equal("ugly", poll.choices[2].description);
  });
});
