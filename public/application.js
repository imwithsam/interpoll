var socket = io();

var voteCounts = document.getElementById('vote-counts');
var pollResults = document.getElementById('poll-results');
var endPollButton = document.getElementById('end-poll');
var buttons = document.querySelectorAll('input[type="radio"]');

socket.on('voteCount', function(votes) {
  var results = '';

  for (var choice in votes) {
    results = results + '<p>' + choice + ': ' + votes[choice] + '</p>';
  }

  pollResults.innerHTML = results;

  console.log('votes', votes);
  console.log('pollResults', pollResults);
});

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.dataset);
  });
}

endPollButton.addEventListener('click', function () {
  socket.send('endPoll', this.dataset);
});
