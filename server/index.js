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
    helpers.getReposByUsername(req.body.data).then((gitArr) => {
      return Promise.all(gitArr.map((repo) => {
        db.save(repo);
      }));
    }).then(() => {
      res.sendStatus(201);
    }).catch((err) => {
      res.sendStatus(400);
    });
  } else {
    res.sendStatus(400);
  }
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.fetch().then((repos) => {
    res.status(200);
    res.send(repos.slice(0, 25));
  }).catch((err) => {
    console.error(err);
    res.sendStatus(500);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

