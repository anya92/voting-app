import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserPolls } from '../../actions';
import { deletePoll } from '../../helpers/polls';

import UserPolls from './UserPolls';
import Results from './Results';

class Profile extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      display: 'polls'
    };
  }

  componentDidMount() {
    const { uid } = this.props.user;
    this.props.getUserPolls(uid);
  }

  deletePoll = (key, title) => {
    const confirmDelete = () => {
      return window.confirm(`Na pewno chcesz usunąć głosowanie "${title}"?`);
    }
    if (confirmDelete()) {
      deletePoll(key);
    }
  } 

  render() {
    const { email, displayName, photoURL } = this.props.user;
    return (
      <div>
        <div>
          <h1>Profile</h1>
          <h2>{email}</h2>
          <h2>{displayName}</h2>
          <h3>{this.props.user.uid}</h3>
          { /*photoURL && <img src={photoURL} alt={displayName || email} />*/ }
        </div>
        <div>
          <div onClick={() => this.setState({ display: 'polls' })}>Twoje głosowania</div>
          <div onClick={() => this.setState({ display: 'results' })}>Wyniki</div>
        </div>
        <div>
          {
            this.state.display === 'polls'
            ? <UserPolls 
                polls={this.props.polls} 
                loading={this.props.loading} 
                error={this.props.error}
                deletePoll={this.deletePoll}
              />
            : <Results 
                polls={this.props.polls} 
                loading={this.props.loading} 
                error={this.props.error}
              />  
          }
          
        </div>  
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { userPolls, loadingUserPolls, errorUserPolls } = state;
  return {
    polls: userPolls,
    loading: loadingUserPolls,
    error: errorUserPolls
  }
}

export default connect(mapStateToProps, { getUserPolls })(Profile);
