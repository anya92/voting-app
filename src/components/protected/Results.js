import React from 'react';
import moment from 'moment';
import formatText from '../../helpers/textFormat';

const Results = ({ polls }) => {
  const numberOfVotes_aggr = polls.reduce((total, poll) => { return total + poll.numberOfVotes}, 0);
  return (
    <div className="results">
      {
        polls.length
        ? <div>
            W Twoich głosowaniach udzielono {numberOfVotes_aggr} odpowiedzi.
          </div>
        : <div>Nie masz jeszcze żadnych głosowań. Dodaj nowe!</div>  
      }
      {
        polls.sort((a, b) => b.created_At - a.created_At).map(poll => {
          return (
            <div key={poll.key} className="results__card">
              <div className="results__card__title">
                {poll.title} ({poll.numberOfVotes}&nbsp;głosów)
              </div>
              <ul className="results__card__answers">
                {
                  Object.entries(poll.answers).sort((a, b) => b[1] - a[1]).map((answer, i) => {
                    return <li key={i}>{answer[0]}: {formatText(answer[1])}</li>
                  })
                }
              </ul>
              <div className="results__card__summary">
                <div>
                  Dodano <u>{ moment(poll.created_At).fromNow() }</u>
                </div>
                <div>
                  Ostatniej odpowiedzi udzielono <u>{ moment(poll.lastVoted_At).fromNow() }</u>
                </div>
              </div>
            </div>
          )  
        })
      }
    </div>
  );
};

export default Results;
