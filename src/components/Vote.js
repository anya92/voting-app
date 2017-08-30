import React, { Component } from 'react';

class Vote extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      newAnswer: null,
      selected: ''
    };
  }

  addNewAnswer = e => {
    this.setState({
      newAnswer: e.target.value,
      selected: e.target.value
    })
  }

  render() {
    const { answers } = this.props.poll;
    
    return (
      <div>
        <form onSubmit={e => this.props.vote(e, this.state.selected)}>
          {
            Object.keys(answers).map((answer, i) => {
              return (
                <div key={i}>
                  <label htmlFor={answer}><span></span>{answer}</label>
                  <input 
                    type="radio"
                    id="answer"
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
