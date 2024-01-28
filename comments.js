// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'comments.json');
const comments = require('./comments.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET
app.get('/comments', (req, res) => {
  res.json(comments);
});

// POST
app.post('/comments', (req, res) => {
  let comment = req.body;
  comment.id = comments.length + 1;
  comments.push(comment);
  fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
    if (err) {
      console.error(err);
    }
    res.json(comments);
  });
});

// PUT
app.put('/comments/:id', (req, res) => {
  let comment = req.body;
  let id = req.params.id;
  comment.id = id;
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].id == id) {
      comments[i] = comment;
    }
  }
  fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
    if (err) {
      console.error(err);
    }
    res.json(comments);
  });
});

// DELETE
app.delete('/comments/:id', (req, res) => {
  let id = req.params.id;
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].id == id) {
      comments.splice(i, 1);
    }
  }
  fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
    if (err) {
      console.error(err);
    }
    res.json(comments);
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});