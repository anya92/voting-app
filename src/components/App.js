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
import NavbarComponent from './NavbarComponent';
import Login from './Login';
import Signup from './Signup';

import Profile from './protected/Profile';

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
        this.setState({ authed: true, loading: false, user: user.email });
      } else {
        this.setState({
          authed: false,
          loading: false,
          user: null
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
        <div>
          <NavbarComponent user={this.state.user} />
          <div className="container">
            <Switch>
              <Route exact path='/' render={() => <h1>Voting App</h1>} />
              <PublicRoute authed={this.state.authed} path="/login" component={Login} />  
              <PublicRoute authed={this.state.authed} path="/signup" component={Signup} />
              <PrivateRoute authed={this.state.authed} path="/profile" component={Profile} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
