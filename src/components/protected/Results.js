import React from 'react';
import { Link } from 'react-router-dom';
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
        : <div>Nie masz jeszcze żadnych głosowań. <Link to="/add">Dodaj</Link> nowe!</div>  
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
                  Dodano <strong>{ moment(poll.created_At).fromNow() }</strong>
                </div>
                  {
                    poll.lastVoted_At !== undefined 
                    ? <div>
                        Ostatniej odpowiedzi udzielono <strong>{ moment(poll.lastVoted_At).fromNow() }</strong>
                      </div>
                    : <div>Nik jeszcze nie zagłosował</div>
                  }
              </div>
            </div>
          )  
        })
      }
    </div>
  );
};

export default Results;
