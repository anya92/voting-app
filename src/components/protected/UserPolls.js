import React from 'react';

const UserPolls = ({ polls, loading, error, deletePoll }) => {
  if (error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;
  return (
    <div>
      <h1>Twoje głosowania({polls.length})</h1>
      <div>
        {
          polls.map(poll => {
            return (
              <div key={poll.key}>
                <div>{poll.title}</div>
                <div onClick={() => deletePoll(poll.key, poll.title)}>&times;</div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default UserPolls;
