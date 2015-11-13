var socket = io();

var voteCounts = document.getElementById('vote-counts');

socket.on('voteCount', function(votes) {
  console.log("=====votes======");
  console.log(votes);
  //var results = '';

  //for (var choice in votes) {
    //results = results + '<p>' + choice + ': ' + votes[choice] + '</p>';
  //};

  //voteCounts.innerHTML = results;
});

var buttons = document.querySelectorAll('input[type="radio"]');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.value);
  });
}
