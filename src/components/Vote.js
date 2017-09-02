import React, { Component } from 'react';

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
        <div>{this.state.error}</div>
        <form onSubmit={e => this.vote(e)}>
          {
            Object.keys(answers).map((answer, i) => {
              return (
                <div key={i}>
                  <label htmlFor={answer}><span></span>{answer}</label>
                  <input 
                    type="radio"
                    id={answer}
                    value={answer}
                    checked={this.state.selected === answer}
                    onChange={e => this.setState({ selected: e.target.value })}
                    required
                  />
                </div>
              )
            })
          }
          {
            this.props.user
            ? (
                <div>
                  <label htmlFor="new-answer"><span></span></label>
                  <input 
                    type="text"
                    placeholder="Dodaj nową odpowiedź"
                    value={this.state.newAnswer === this.state.selected ? this.state.selected : ''}
                    onChange={e => this.addNewAnswer(e)}
                  />
                </div>
              )
            : (
                <div>Zaloguj się, by dodać nową odpowiedź.</div>
              )
          }
          <button type="submit">Zagłosuj</button>
        </form>
      </div>
    );
  }
}

export default Vote;
