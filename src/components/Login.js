import React, { Component } from 'react';
import { loginUser, sendReset } from '../helpers/auth';

class Login extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      email: '',
      password: '',
      error: {
        message: ''
      },
      renderResetPassword: false,
      resetEmail: '',
      reset: {}
    };
  }

  signin = e => {
    e.preventDefault();
    const { email, password } = this.state;
    loginUser(email, password) 
      .catch(error => this.setState({ error }));
  }

  resetPassword = e => {
    e.preventDefault();

    const email = this.state.resetEmail;
    sendReset(email)
      .then(() => this.setState({ reset: { message: 'Email został wysłany. Sprawdź swoją pocztę.' } }))
      .catch(error => this.setState({ reset: { error: error.message } }));
  }

  renderResetPassword = () => {
    return (
      <div>
        <form onSubmit={e => this.resetPassword(e)} className="form form__reset-password">
          <div className="form__reset-password__close" onClick={() => this.setState({ renderResetPassword: false })}>
            &#x2715;
          </div>
          <div className="message message--success">
            {this.state.reset.message}
          </div>
          <div className="message message--error">
            {this.state.reset.error}
          </div>
          <div>
            <label htmlFor="forgot-email">
              Nie pamiętasz hasła? Podaj swój adres e-mail.<br/>
              Zostanie wysłany na niego link do zmiany hasła. 
            </label>
            <input 
              type="email"
              name="forgot-email"
              value={this.state.resetEmail}
              onChange={e => this.setState({ resetEmail: e.target.value })}
            />
          </div>
          <button type="submit">Wyślij</button>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">Zaloguj się</h1>
        <form onSubmit={e => this.signin(e)} className="form">
          <div className="message message--error">
            {this.state.error.message}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input 
              type="email"
              name="email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="password">Hasło</label>
            <input 
              type="password"
              name="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <button type="submit">
            Zaloguj się
          </button>
          <hr/>
        </form>
        {
          this.state.renderResetPassword 
          ? this.renderResetPassword()
          : <div className="form">
              <button onClick={() => this.setState({ renderResetPassword: true })}>
                Zapomniałeś hasła?
              </button>
            </div>
        }
      </div>
    );
  }
}

export default Login;
