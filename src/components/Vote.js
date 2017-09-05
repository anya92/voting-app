import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Vote extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      newAnswer: null,
      selected: '',
      error: ''
    };
  }

  addNewAnswer = e => {
    this.setState({
      newAnswer: e.target.value,
      selected: e.target.value
    })
  }

  vote = e => {
    e.preventDefault();
    if(!this.state.selected) {
      this.setState({ error: 'Wybierz jedną z opcji.'});
      return;
    }
    this.props.vote(this.state.selected);
  }

  render() {
    const { answers } = this.props.poll;
    
    return (
      <div>
        <form onSubmit={e => this.vote(e)} className="form">
          <fieldset>
            <legend>Zagłosuj</legend>
            <div className="message message--error">
              {this.state.error}
            </div>
            <div className="form__radio">
              <div>{this.props.poll.title}</div>
              {
                Object.keys(answers).map((answer, i) => {
                  return (
                    <div key={i}>
                      <input 
                        type="radio"
                        id={answer}
                        value={answer}
                        checked={this.state.selected === answer}
                        onChange={e => this.setState({ selected: e.target.value })}
                        required
                      />
                      <label htmlFor={answer}><span></span>{answer}</label>
                    </div>
                  )
                })
              }
              {
                this.props.user
                ? (
                    <div className="form__radio__new-answer">
                      <input type="radio" id="newAnswer"  checked={this.state.selected === this.state.newAnswer} required />
                      <label htmlFor="newAnswer"><span></span></label>
                      <input 
                        type="text"
                        placeholder="Dodaj nową odpowiedź"
                        value={this.state.newAnswer === this.state.selected ? this.state.selected : ''}
                        onChange={e => this.addNewAnswer(e)}
                      />
                    </div>
                  )
                : (
                    <div><Link to="/login">Zaloguj się</Link>, by dodać nową odpowiedź.</div>
                  )
              }
            </div>
            <button type="submit">Zagłosuj</button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Vote;
