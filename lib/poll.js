const crypto = require('crypto');

function Poll() {
  this.id = crypto.randomBytes(20).toString('hex');
  this.voterId = crypto.randomBytes(20).toString('hex');
  this.adminUrl = `http://localhost:3000/${this.id}`;
  this.voterUrl = `http://localhost:3000/${this.voterId}`;
  this.question = null;
  this.choices = [];
}

Poll.prototype.getQuestion = function () {
  return this.question;
};

Poll.prototype.setQuestion = function (value) {
  this.question = value;
  return this;
};

Poll.prototype.getChoices = function () {
  return this.choices;
}

Poll.prototype.addChoice = function (desc) {
  this.choices.push({description: desc, voters: []});
  return this;
}

Poll.prototype.addVoteToChoice = function (userId, choiceIndex) {
  this.choices[choiceIndex].voters.push(userId);
};

Poll.prototype.updateVoterChoice = function (userId, choiceIndex) {
  //remove the voter id from the previous choice
  //add the voter id to the new choice
  //choices = [{description: "good", voters: [1, 2, 3]}];

  this.choices.forEach(function(choice){
    if (choice.voters.indexOf(userId) !== -1) {
      choice.voters.splice(choice.voters.indexOf(userId), 1);
    }
  });
  this.addVoteToChoice(userId, choiceIndex);
};



















//methods like set question
//no need for choice to be constructor
//choice has an id, description, and an array of voter ids
//if (!req.cookies.userId) {
//  res.cookie('userId', 'sddfadsk')
//  res.send(<p></p>);
//  grab the cookie from the dom, can use a cookie parser in express
// jquery cookie
// Poll.prototype.get = funciton (property) {
//   return this[property];
// };
// Poll.prototype.set = funciton (Property,value) {
//   this[property] = value;
//   save it to database, and emit an event on the channel to all connected sockets with a copy of the new polldata, do this after you get the basic structure
//   return this;
// };
// poll, method takes userId and their choice and sets the choice attribute
// addChoices method
// addVoteToChoice(userId, choiceId)
// removeVoteFromChoice(userId, choiceId)
// private helper method for the other choices
// get a body parser
module.exports = Poll;
