import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
      <div className="container profile">
        <div className="profile__header">
          <div className="profile__header__name">
            {displayName || email}
          </div>
          <div className="profile__header__email">
            {displayName && email}
          </div>
          <div className="profile__header__photo">
            { photoURL && <img src={photoURL} alt={displayName || email} /> }
          </div>
          <div className="profile__header__edit">
            <Link to='/settings'>Edytuj <i className="fa fa-pencil-square-o"></i></Link>
          </div>
        </div>
        <div className="profile__menu">
          <div
            className={`profile__menu__polls ${this.state.display === 'polls' ? 'active' : ''}`} 
            onClick={() => this.setState({ display: 'polls' })}>
            Twoje głosowania ({this.props.polls.length})
          </div>
          <div 
            className={`profile__menu__results ${this.state.display === 'results' ? 'active' : ''}`}
            onClick={() => this.setState({ display: 'results' })}>
            Wyniki
          </div>
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
