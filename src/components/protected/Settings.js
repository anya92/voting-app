import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { updateUser, changeEmail, changePassword } from '../../helpers/user';

class Settings extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      email: '',
      displayName: '',
      photoURL: '',
      showPhoto: false,
      providedPassword: '',
      newPassword: '',
      successEmail: '',
      errorEmail: '',
      successPassword: '',
      errorPassword: ''
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

  changePassword = e => {
    e.preventDefault();

    const { email, providedPassword, newPassword } = this.state;
    changePassword(email, providedPassword, newPassword)
      .then(message => this.setState({ successPassword: message, errorPassword: '' }))
      .catch(error => this.setState({ errorPassword: error }));
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">
          Edytuj profil
        </h1>
        <div> {/* Update User Profile Form */}
          <form onSubmit={e => this.updateUser(e)} className="form">
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
                <div className="form__input-with-span">
                  <input 
                    type="text"
                    name="photo"
                    value={this.state.photoURL || ''}
                    onChange={e => this.setState({ photoURL: e.target.value })}
                  />
                  <span 
                    className="show-photo" 
                    onClick={() => this.setState({ showPhoto: true})}>
                      <i className="fa fa-external-link"></i>
                  </span>
                </div>
                <div className={`form__modal-photo ${this.state.showPhoto ? 'open' : ''}`}>
                  <img src={this.state.photoURL} alt={this.state.displayName} />
                  <span onClick={() => this.setState({ showPhoto: false })}>&#x2715;</span>
                </div> 
              </div>
              <button type="submit">ZAPISZ</button><hr/>
            </fieldset>
          </form>
        </div>
        <div> {/* Change Email Form */}
          <form onSubmit={e => this.changeEmail(e)} className="form">
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
              <button type="submit">ZAPISZ</button><hr/>
            </fieldset>
          </form>
        </div>
        <div> {/* Change Password Form */}
          <form onSubmit={e => this.changePassword(e)} className="form">
            <fieldset>
              <legend>Zmiana hasła</legend>
              <div>
                By zmienić hasło, podaj obecne hasło, a następnie wpisz nowe.
              </div>
              <div>{this.state.successPassword}</div>
              <div>{this.state.errorPassword}</div>
              <div>
                <label htmlFor="old-password">Obecne hasło</label>
                <input 
                  type="password"
                  name="old-password"
                  onChange={e => this.setState({ providedPassword: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="new-password">Nowe hasło</label>
                <input 
                  type="password"
                  name="new-password"
                  onChange={e => this.setState({ newPassword: e.target.value })}
                />
              </div>
              <button type="submit">ZAPISZ</button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default Settings;
