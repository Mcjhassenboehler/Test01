const { Router } = require('express');
const Repos = Router();
const saveRepo = require('../database/index.js');

Repos.get('/', (req, res) => {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

Repos.post('/', async (req, res) => {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const { username } = req.body;

  try {
    // Make a GET request to the GitHub API to fetch repo information
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    const repos = response.data;

    // Save the repo information in the database using your saveRepo function
    await saveRepo(repos);

    res.sendStatus(201); // Respond with status code 201 for successful creation
  } catch (error) {
    console.error('Error fetching or saving repos:', error);
    res.sendStatus(500); // Respond with status code 500 for internal server error
  }
});

module.exports = {
  Repos,
};
