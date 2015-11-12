const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const bodyParser = require('body-parser');
const Poll = require('./lib/poll');
const redis = require('redis');
const client = redis.createClient();
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

  poll.question = req.body.question;
  poll.addChoice(req.body.choice1);
  poll.addChoice(req.body.choice2);
  poll.addChoice(req.body.choice3);
  client.hmset('polls', poll.id, JSON.stringify(poll));

  res.render('create', {
    poll: poll
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

http.listen(process.env.PORT || 3000, function(){
  console.log('Your server is up and running on Port 3000. Good job!');
});
