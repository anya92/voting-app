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
      reset: {
        message: '',
        error: ''
      }
    };
  }

  signin = e => {
    e.preventDefault();
    const { email, password } = this.state;
    loginUser(email, password) 
      .catch(error => this.setState({ error }));
  }

  resetPassword = () => {
    sendReset()
      .then(() => 
        this.setState({ 
          reset: {
            message: 'Email został wysłany. Sprawdź swoją pocztę.'
          }
        })
      )
      .catch(error => 
        this.setState({
          reset: {
            error: error.message
          }
        })
      );
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.signin(e)}>
          <div>
            { this.state.error.message }
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
        </form>
      </div>
    );
  }
}

export default Login;
