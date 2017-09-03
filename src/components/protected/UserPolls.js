import React from 'react';

const UserPolls = ({ polls, loading, error }) => {
  if (error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;
  return (
    <div>
      <h1>Twoje głosowania({polls.length})</h1>
      <pre>{ JSON.stringify(polls, null, ' ') }</pre>
    </div>
  );
};

export default UserPolls;
