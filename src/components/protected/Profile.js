import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserPolls } from '../../actions';
import { deletePoll } from '../../helpers/polls';

import UserPolls from './UserPolls';

class Profile extends Component {
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
          <UserPolls 
            polls={this.props.polls} 
            loading={this.props.loading} 
            error={this.props.error}
            deletePoll={this.deletePoll}
          />
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
