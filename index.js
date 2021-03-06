const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const bodyParser = require('body-parser');
const Poll = require('./lib/poll');
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);
const _ = require('lodash');

//check with redis-cli, keys *, hgetall "polls"
//flushall
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/new', function (req, res){
  res.sendFile(path.join(__dirname, '/public/new.html'));
});

app.post('/create', function (req, res){
  var poll = new Poll();
  var host = req.headers.host;

  poll.question = req.body.question;
  poll.addChoice(req.body.choice1);
  poll.addChoice(req.body.choice2);
  poll.addChoice(req.body.choice3);
  console.log(poll, "#1 poll object");
  client.hmset('polls', poll.id, JSON.stringify(poll));

  res.render('create', {
    poll: poll,
    host: host
  });
});

app.get('/vote/:id', function (req, res) {
  client.hgetall('polls', function(err, polls){
    var targetPoll = _.find(polls, function (poll) {
      return JSON.parse(poll).voterId === req.params.id;
    });
    res.render('votes', {
      poll: JSON.parse(targetPoll)
    });
  });
});

app.get('/admin/:id', function (req, res) {
  client.hgetall('polls', function(err, polls){
    var targetPoll = polls[req.params.id];
    res.render('admin', {
      poll: JSON.parse(targetPoll),
      votes: countVotes(targetPoll.votes)
    });
  });
});


io.on('connection', function(socket) {
  console.log('A user has connected.');
  console.log(io.engine.clientsCount + ' user(s) now connected.');

  socket.emit('socketId', socket.id);

  socket.on('disconnect', function() {
    console.log('A user has disconnected.');
  });

  socket.on('message', function(channel, message) {
    if (channel === 'voteCast') {
      client.hgetall('polls', function(err, polls){
        var targetPoll = JSON.parse(polls[message.pollId]);
        if (targetPoll.isOpen) {
          targetPoll.votes[message.socketId] = message.choice;
          client.hmset('polls', message.pollId, JSON.stringify(targetPoll));
          io.sockets.emit('voteCount', countVotes(targetPoll.votes));
        }
      });
    }

    if (channel === 'endPoll') {
      console.log(message, 'message when endPoll');
      client.hgetall('polls', function(err, polls){
        var targetPoll = JSON.parse(polls[message.pollId]);
        targetPoll.isOpen = false;
        client.hmset('polls', message.pollId, JSON.stringify(targetPoll));
      });
    }
  });
});

// Keep track of vote counts
function countVotes(votes) {
  var result = _.reduce(votes, function(hash, choice, socketId){
    if (hash[choice]) {
      hash[choice] += 1;
    } else {
      hash[choice] = 1;
    }
    return hash;
  }, {});
  return result;
}

http.listen(process.env.PORT || 3000, function(){
  console.log('Your server is up and running on Port 3000. Good job!');
});
