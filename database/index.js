const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useMongoClient: true});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repoId: {
    type: Number,
    unique: true
  },
  username: String,
  repoName: String,
  repoUrl: String,
  description: String,
  forkCount: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var document = new Repo({
    repoId: repo.id,
    username: repo.owner.login,
    repoName: repo.name,
    repoUrl: repo.html_url,
    description: repo.description,
    forkCount: repo.forks_count
  });

  return new Promise((resolve, reject) => {
    document.save((err, repo) => {
      if (err) {
        reject(err);
      } else {
        resolve(repo);
      }
    });
  });
};

let fetch = () => {
  return Repo.find({}).sort({forkCount: 'descending'});
};

module.exports.save = save;
module.exports.fetch = fetch;
