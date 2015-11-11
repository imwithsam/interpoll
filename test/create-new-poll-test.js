var $ = require('jquery');
var assert = require('chai').assert;

describe('Homepage', function() {
  it('has a Create New Poll button', function() {
    var $dom = $(document).clone();
    var $button = $dom('#create-poll');

    assert.equal('Create New Poll', button.text());
  });
});
