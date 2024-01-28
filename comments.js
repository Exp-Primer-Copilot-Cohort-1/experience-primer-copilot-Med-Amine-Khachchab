// Create a web server

// 1. Handle GET requests for /comments
// 2. Handle POST requests for /comments
// 3. Handle DELETE requests for /comments/:id

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

app.use(express.static('public'));
app.use(bodyParser.json());

var comments = [
  { id: 1, author: 'Morgan', text: 'I am the first comment' },
  { id: 2, author: 'Brett', text: 'This is a comment' }
];

// GET /comments
app.get('/comments', function(req, res) {
  res.json(comments);
});

// POST /comments
app.post('/comments', function(req, res) {
  var newComment = req.body;
  newComment.id = _.uniqueId();
  comments.push(newComment);
  res.json(newComment);
});

// DELETE /comments/:id
app.delete('/comments/:id', function(req, res) {
  var id = parseInt(req.params.id);
  var comment = _.find(comments, { id: id });
  _.remove(comments, { id: id });
  res.json(comment);
});

app.listen(3000, function() {
  console.log('Server started on port 3000');
});

