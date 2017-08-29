import React, { Component } from 'react';
import { registerUser } from '../helpers/auth';

class Signup extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      error: {
        message: ''
      }
    };
  }

  confirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  }

  signup = e => {
    e.preventDefault();
    const { email, password, confirmPassword } = this.state;
    if (this.confirmPassword(password, confirmPassword)) {
      registerUser(email, password)
        .catch(error => this.setState({ error })); 
    } else {
      this.setState({
        error: {
          message: 'Podane hasła się nie zgadzają.'
        }
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.signup(e)}>
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
          <div>
            <label htmlFor="confirm-password">Powtórz hasło</label>
            <input 
              type="password"
              name="confirm-password"
              value={this.state.confirmPassword}
              onChange={e => this.setState({ confirmPassword: e.target.value })}
            />
          </div>
          <button type="submit">
            Zarejestruj się
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;
