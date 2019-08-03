const helpers = require('../helpers/github.js');
const db = require('../database/index.js');
const bodyParser = require('body-parser');
const express = require('express');
let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  if (req.body.data) {
    helpers.getReposByUsername(req.body.data, (gitArr) => {
      // console.log(gitArr);
      gitArr.forEach((repo) => {
        db.save(repo);
      });
    });
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

