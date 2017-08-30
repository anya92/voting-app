import React, { Component } from 'react';

class Profile extends Component {
  render() {
    const { email, displayName, photoURL } = this.props.user;
    return (
      <div>
        <h1>Profile</h1>
        <h2>{email}</h2>
        <h2>{displayName}</h2>
        { photoURL && <img src={photoURL} alt={displayName || email} />}
      </div>
    );
  }
}

export default Profile;
