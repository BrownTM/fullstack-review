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
    this.getTop.bind(this);
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
      success: () => {
        this.getTop();
        // this.setState({
        //   repos: []
        // });
        console.log('Made it');
      }
    });
  }

  getTop() {
    $.ajax({
      url: '/repos',
      type: 'GET',
      success: (repos) => {
        console.log('BEFORE', this.state.repos);
        this.setState({
          repos: repos
        });
        console.log('AFTER', this.state.repos);
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