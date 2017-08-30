import React, { Component } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllPolls } from '../actions';
import { firebaseApp } from '../firebase';

// import style files
import '../../node_modules/normalize.css/normalize.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.css';

import { PrivateRoute, PublicRoute } from '../helpers/routesTypes';
import NavbarComponent from './NavbarComponent';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';

import Profile from './protected/Profile';
import Add from './protected/Add';

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      authed: false,
      loading: true, 
      user: null
    };
  }

  componentDidMount() {
    this.authUser = firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ 
          authed: true, 
          loading: false, 
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
          } 
        });
      } else {
        this.setState({
          authed: false,
          loading: false,
          user: null
        });
      }
    });
    // this.props.getAllPolls();
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
              <Route exact path='/' component={Home} />
              <PublicRoute authed={this.state.authed} path="/login" component={Login} />  
              <PublicRoute authed={this.state.authed} path="/signup" component={Signup} />
              <PrivateRoute authed={this.state.authed} user={this.state.user} path="/profile" component={Profile} />
              <PrivateRoute authed={this.state.authed} user={this.state.user} path="/add" component={Add} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default connect(null, { getAllPolls })(App);
