const crypto = require('crypto');

function Poll() {
  this.id = crypto.randomBytes(20).toString('hex');
}

module.exports = Poll;
