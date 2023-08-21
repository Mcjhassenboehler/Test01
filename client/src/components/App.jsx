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
