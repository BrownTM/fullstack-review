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
  // console.log(repo);
  var document = new Repo({
    repoId: repo.id,
    username: repo.owner.login,
    repoName: repo.name,
    repoUrl: repo.html_url,
    description: repo.description,
    forkCount: repo.forks_count
  });
  document.save((err) => {
    if (err) {
      return console.error(err);
    }
    console.log('Success');
  });
};

let fetch = () => {
  return Repo.find({}).sort({forkCount: 'descending'});
};

module.exports.save = save;
module.exports.fetch = fetch;
