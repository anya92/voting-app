import React, { Component } from 'react';
import { updateUser, changeEmail } from '../../helpers/user';

class Settings extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      email: '',
      displayName: '',
      photoURL: '',
      successEmail: '',
      errorEmail: ''
    };
  }

  componentDidMount() {
    const { email, displayName, photoURL } = this.props.user;
    this.setState({ email, displayName, photoURL });
  }

  updateUser = e => {
    e.preventDefault();

    const { displayName, photoURL } = this.state;
    updateUser(displayName, photoURL);
  }

  changeEmail = e => {
    e.preventDefault();

    const { email, providedPassword } = this.state;
    changeEmail(this.props.user.email, email, providedPassword)
      .then(message => this.setState({ successEmail: message, errorEmail: '' }))
      .catch(error => this.setState({ errorEmail: error }));
  }

  render() {
    return (
      <div>
        <div>
          <h1>Ustawienia</h1>
        </div>
        <div>
          <img src={this.state.photoURL} alt={this.state.displayName} />
        </div>
        <div>
          <form onSubmit={e => this.updateUser(e)}>
            <fieldset>
              <legend>Twoje dane</legend>
              <div>
                <label htmlFor="displayName">Ustaw lub zmień nazwę użytkownika</label>
                <input 
                  type="text"
                  name="displayName"
                  value={this.state.displayName || ''}
                  onChange={e => this.setState({ displayName: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="photo">Ustaw lub zmień zdjęcie profilowe</label>
                <input 
                  type="text"
                  name="photo"
                  value={this.state.photoURL || ''}
                  onChange={e => this.setState({ photoURL: e.target.value })}
                />
              </div>
              <button type="submit">Zapisz</button>
            </fieldset>
          </form>
        </div>
        <div>
          <form onSubmit={e => this.changeEmail(e)}>
            <fieldset>
              <legend>Zmiana adresu e-mail</legend>
              <div>
                <div>{this.state.successEmail}</div>
                <div>{this.state.errorEmail}</div>
              </div>
              <div>
                <label htmlFor="email">Nowy adres e-mail</label>
                <input 
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="provided-password">Hasło</label>
                <input 
                  type="password"
                  name="provided-password"
                  onChange={e => this.setState({ providedPassword: e.target.value })}
                />
              </div>
              <button type="submit">Zapisz</button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default Settings;
