import React from 'react';
import axios from 'axios';

import Search from './Search.jsx';
import RepoList from './RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
  }


  handleSearch(username) {
    console.log(`${username} was searched`);
    // TODO
    // Make the API request using axios
    axios.post('/api/repos', { username })
    .then((response) => {
      // Assuming the response data is an array of repositories
      const fetchedRepos = response.data;

      // Update the state with the fetched repositories
      this.setState({
        repos: fetchedRepos,
      });
    })
    .catch((error) => {
      console.error('Error fetching repositories:', error);
    });
  }

  render() {
    const { repos } = this.state;

    return (
      <div>
        <h1>Github Fetcher</h1>
        <RepoList repos={repos} />
        <Search onSearch={this.handleSearch} />
      </div>
    );
  }
}

export default App;
