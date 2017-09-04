import React from 'react';
import Card from '../Card';

const UserPolls = ({ polls, loading, error, deletePoll }) => {
  if (error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;
  return (
    <div>
      {
        polls.map(poll => {
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
