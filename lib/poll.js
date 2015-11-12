const crypto = require('crypto');

function Poll() {
  this.id = crypto.randomBytes(20).toString('hex');
  this.voterId = crypto.randomBytes(20).toString('hex');
  this.adminUrl = `http://localhost:3000/admin/${this.id}`;
  this.voterUrl = `http://localhost:3000/vote/${this.voterId}`;
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
  this.choices.forEach(function(choice){
    if (choice.voters.indexOf(userId) !== -1) {
      choice.voters.splice(choice.voters.indexOf(userId), 1);
    }
  });
  this.addVoteToChoice(userId, choiceIndex);
};

module.exports = Poll;
