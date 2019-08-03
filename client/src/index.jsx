import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  componentDidMount () {
    this.getTop();
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      url: '/repos',
      type: 'POST',
      data: {data: term},
      success: () => this.getTop()
    });
  }

  getTop() {
    $.ajax({
      url: '/repos',
      type: 'GET',
      success: (repos) => {
        this.setState({
          repos: repos
        });
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));