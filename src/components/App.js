import React, { Component } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

// import style files
import '../../node_modules/normalize.css/normalize.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.css';


class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/' render={() => <h1>Voting App</h1>} />
      </Router>
    );
  }
}

export default App;
