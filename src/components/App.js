import React, { Component } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { firebaseApp } from '../firebase';

// import style files
import '../../node_modules/normalize.css/normalize.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.css';

import { PrivateRoute, PublicRoute } from '../helpers/routesTypes';
import Signup from './Signup';

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      authed: false,
      loading: true, user: null
    };
  }

  componentDidMount() {
    this.authUser = firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        this.setState({ authed: true, loading: false, user });
      } else {
        this.setState({
          authed: false
        });
      }
    })
  }

  componentWillUnmount() {
    this.authUser();
  }

  render() {
    return this.state.loading ? <div>Ładowanie</div> : (
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
