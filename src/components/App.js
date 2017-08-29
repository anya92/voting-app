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

import { PrivateRoute, PublicRoute } from './routesTypes';
import Signup from './Signup';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' render={() => <h1>Voting App</h1>} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Router>
    );
  }
}

export default App;
