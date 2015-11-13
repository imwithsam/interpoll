// Initiate client-side WebSocket connection
var socket = io();

var voteCounts = document.getElementById('vote-counts');

// Listen for emitted voteCount channel from server
socket.on('voteCount', function(votes) {
  var results = '';

  for (var choice in votes) {
    results = results + '<p>' + choice + ': ' + votes[choice] + '</p>';
  };

  voteCounts.innerHTML = results;
});

// Add event listeners to all voting buttons
var buttons = document.querySelectorAll('input[type="radio"]');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.value);
  });
}
