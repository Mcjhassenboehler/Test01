/* eslint-disable camelcase */

const mongoose = require('mongoose');

const DATABASE = 'fetcher';
const DB_URI = `mongodb://localhost/${DATABASE}`;
// TODO: Put the field you are gonna use to sort the repos by.
// Your schema should have this field.
const SORTING_BY_FIELD = '_id';

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Failed to connect to database', err));

const repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  _id: Number,
  name: String,
  owner: String,
  owner_avatar: String,
  owner_url: String,
  html_url: String,
  updated_at: Date,
  description: String
});

const Repo = mongoose.model('Repo', repoSchema);

const saveRepo = (repos, callback) => {
  // TODO: Your code here
  // This function should save a repo to the MongoDB
    Repo.insertMany(repos, {ordered: false}, (err, data) => {
      if (err){
        callback(err)
      } else {
        callback(null, data)
      }
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
