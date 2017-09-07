import React, { Component } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { firebaseApp, userRef } from '../firebase';

// import style files
import '../../node_modules/normalize.css/normalize.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css'; 
import '../styles/styles.css';

import { PrivateRoute, PublicRoute } from '../helpers/routesTypes';
import NavbarComponent from './NavbarComponent';
import About from './About';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import SinglePoll from './SinglePoll';
import TopPolls from './TopPolls';

import Profile from './protected/Profile';
import Settings from './protected/Settings';
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
      this.setState({ loading: true });
      if (user) {
        userRef.child(user.uid).on('value', snap => {
          const { email, displayName, photoURL } = snap.val();
          this.setState({
            user: {
              uid: user.uid,
              email,
              displayName,
              photoURL
            },
            loading: false,
            authed: true
          });
        });        
      } else {
        this.setState({
          authed: false,
          loading: false,
          user: null
        });
      }
    });
  }

  componentWillUnmount() {
    this.authUser();
  }

  render() {
    return this.state.loading ? <div className="loading"></div> : (
      <Router>
        <div>
          <NavbarComponent user={this.state.user} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/top' component={TopPolls} />
            <Route path='/about' component={About} />
            <PublicRoute authed={this.state.authed} path="/login" component={Login} />  
            <PublicRoute authed={this.state.authed} path="/signup" component={Signup} />
            <PrivateRoute authed={this.state.authed} user={this.state.user} path="/profile" component={Profile} />
            <PrivateRoute authed={this.state.authed} path="/settings" user={this.state.user} component={Settings} />
            <PrivateRoute authed={this.state.authed} user={this.state.user} path="/add" component={Add} />
            <Route path='/polls/:key' render={({ match }) => <SinglePoll pollKey={match.params.key} user={this.state.user} />} />  
          </Switch>
          <div className="footer">
            <p className="footer__text">&#10092; &#10093; with <span className="footer__heart">&#10084;</span> by <a href="https://github.com/anya92" target="_black">anya92</a>
            </p>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
