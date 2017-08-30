import React, { Component } from 'react';
import { addPoll } from '../../helpers/polls';

const AnswerInput = ({ id, onAnswerChange, removeAnswerInput, value }) => {
  return (id <= 1)
  ? (
      <input 
        type="text"
        value={value || ''}
        onChange={e => onAnswerChange(id, e)}
        required
      />
    )
  : (
      <div>
        <input 
          type="text"
          value={value || ''}
          onChange={e => onAnswerChange(id, e)}
        />
        <span onClick={e => removeAnswerInput(id, e)}>
          &#x2715;
        </span>
      </div>
    );
}

class Add extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      title: '',
      numberOfAnswers: 2,
      answers: [],
      photoURL: '',
      error: ''
    };
  }

  addAnswerInput = e => {
    e.preventDefault();

    this.setState({
      numberOfAnswers: this.state.numberOfAnswers + 1
    });
  }

  removeAnswerInput = (id, e) => {
    e.preventDefault();

    if (this.state.numberOfAnswers <= 2) return;

    let { numberOfAnswers, answers } = this.state;
    numberOfAnswers -= 1;
    answers.splice(id, 1);

    this.setState({
      numberOfAnswers,
      answers
    });
  }

  onAnswerChange = (id, e) => {
    let { answers } = this.state;
    answers[id] = e.target.value;
    this.setState({
      answers
    });
  }

  addNewPoll = e => {
    e.preventDefault();

    const { title, answers, photoURL } = this.state;
    const author = this.props.user.uid;
    let answersObj = {};
    answers.forEach(answer => {
      answer = answer.replace(/[.$#/[\]]/g, '');
      answersObj[answer] = 0;
    });
    
    addPoll(title, answersObj, photoURL, author)
      .then(poll => this.props.history.push(`/polls/${poll.key}`))
      .catch(error => {
        console.log(error);
        this.setState({ error: 'Wystąpił błąd. Spróbuj ponownie później.' })
      });
  }

  render() {
    return (
      <div>
        <div>
          <h1>Dodaj nowe głosowanie</h1>
        </div>
        <div>
          <div>{this.state.error}</div>
          <form onSubmit={e => this.addNewPoll(e)}>
            <div>
              <label htmlFor="title">Pytanie</label>
              <input 
                type="text"
                name="title"
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="photo">Zdjęcie</label>
              <input 
                type="text"
                name="photo"                
                value={this.state.photoURL}
                onChange={e => this.setState({ photoURL: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="answers">Odpowiedzi</label>
              {
                [...Array(this.state.numberOfAnswers).keys()].map(i => {
                  return (
                    <AnswerInput
                      id={i}
                      key={i}
                      value={this.state.answers[i]}
                      onAnswerChange={this.onAnswerChange}
                      removeAnswerInput={this.removeAnswerInput}
                    />  
                  );
                })
              }
            </div>
            <div onClick={e => this.addAnswerInput(e)}>
              <span>+</span>
              <p>Dodaj nową odpowiedź</p>
            </div>
            <button type="submit">Dodaj</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Add;
