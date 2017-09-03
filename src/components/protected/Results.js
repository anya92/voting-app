import React from 'react';

const Results = ({ polls }) => {
  const numberOfVotes_aggr = polls.reduce((total, poll) => { return total + poll.numberOfVotes}, 0);
  return (
    <div>
      <div>Wyniki</div>
      <div>W Twoich głosowaniach udzielono {numberOfVotes_aggr} odpowiedzi.</div>
      {
        polls.sort((a, b) => b.numberOfVotes - a.numberOfVotes).map(poll => {
          return (
            <div key={poll.key}>
              <div>{poll.title} ({poll.numberOfVotes} głosów)</div>
              <ul>
                {
                  Object.entries(poll.answers).sort((a, b) => b[1] - a[1]).map((answer, i) => {
                    return <li key={i}>{answer[0]}: {answer[1]} głosów</li>
                  })
                }
              </ul>
            </div>
          )  
        })
      }
    </div>
  );
};

export default Results;
