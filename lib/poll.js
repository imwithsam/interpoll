const crypto = require('crypto');

function Poll() {
  this.id = crypto.randomBytes(20).toString('hex');
  this.adminUrl = `http://localhost:3000/${this.id}`;
  this.voterUrl = `http://localhost:3000/${crypto.randomBytes(20).toString('hex')}`;
}

module.exports = Poll;
