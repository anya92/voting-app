import { pollRef } from '../firebase';

export function addPoll(title, answers, photoURL, author) {
  const created_At = Date.now();
  const numberOfVotes = 0;
  
  return pollRef.push({
    title,
    answers,
    photoURL,
    author,
    created_At,
    numberOfVotes
  });
}
