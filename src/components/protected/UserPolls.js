import React from 'react';
import Card from '../Card';

const UserPolls = ({ polls, loading, error, deletePoll }) => {
  if (error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;
  if (!polls.length) return <div>Nie masz jeszcze żadnych głosowań. Dodaj nowe!</div>;
  return (
    <div>
      {
        polls.sort((a, b) => b.created_At - a.created_At).map(poll => {
          return (
            <Card 
              key={poll.key} 
              poll={poll}
              deletePoll={deletePoll}
            />
          )
        })
      }
    </div>
  );
};

export default UserPolls;
