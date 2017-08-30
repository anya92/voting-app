import { pollRef } from '../firebase';

export function addPoll(title, answers, photoURL, author) {
  const created_At = Date.now();
  const numberOfVotes = 0;
  const voters = false;

  return pollRef.push({
    title,
    answers,
    photoURL,
    author,
    created_At,
    numberOfVotes,
    voters
  });
}

export function updatePoll(key, answers, numberOfVotes, voters) {
  const lastVoted_At = Date.now();

  pollRef.child(key).update({
    answers,
    numberOfVotes,
    lastVoted_At,
    voters
  });
}
