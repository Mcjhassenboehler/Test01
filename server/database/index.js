/* eslint-disable camelcase */

const mongoose = require('mongoose');

const DATABASE = 'fetcher';
const DB_URI = `mongodb://localhost/${DATABASE}`;
// TODO: Put the field you are gonna use to sort the repos by.
// Your schema should have this field.
const SORTING_BY_FIELD = 'updated_at';

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Failed to connect to database', err));
  

const repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  _id: Number,
  name: String,
  owner: {
    url: String
  },
  updated_at: Date,
});

const Repo = mongoose.model('Repo', repoSchema);

const saveRepo = (repoData) => {
  // TODO: Your code here
  // This function should save a repo to the MongoDB
  const newRepo = Repo(repoData)
  newRepo.save()
    .then(() => {
      console.log('Repo Saved')
    })
    .catch (err => {
      console.error('Error saving repo:', err)
    })
};

const getTop25Repos = (callback) => {
  // TODO: Your code here
  // This function should get the repos from mongo
  Repo.find({}, {}, {limit: 25}, (err, data) => {
    if (err){
      callback(err)
    } else {
      callback(null, data)
    }
  }).sort('-updated_at')
};

module.exports.SORTING_BY_FIELD = SORTING_BY_FIELD;
module.exports.saveRepo = saveRepo;
module.exports.getTop25Repos = getTop25Repos;
