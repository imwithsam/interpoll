const crypto = require('crypto');

function generateHash() {
  return crypto.randomBytes(20).toString('hex');
}

function Poll() {
  this.id = generateHash();
  this.voterId = generateHash();
  this.question = null;
  this.choices = [];
  this.isOpen = true;
  this.votes = {};
}

Poll.prototype.adminUrl = function () {
  return '/admin/' + this.id;
};

Poll.prototype.voterUrl = function () {
  return '/vote/' + this.voterId;
};

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
  this.choices.forEach(function(choice){
    if (choice.voters.indexOf(userId) !== -1) {
      choice.voters.splice(choice.voters.indexOf(userId), 1);
    }
  });
  this.addVoteToChoice(userId, choiceIndex);
};

module.exports = Poll;
