import {
  GET_ALL_POLLS_LOADING,
  GET_ALL_POLLS_SUCCESS,
  GET_ALL_POLLS_ERROR,
  GET_SINGLE_POLL_LOADING,
  GET_SINGLE_POLL_SUCCESS,
  GET_SINGLE_POLL_ERROR
} from './actionTypes';

import { pollRef, userRef } from '../firebase';

export function getAllPolls() {
  return dispatch => {
    dispatch({ type: GET_ALL_POLLS_LOADING, loading: true });

    pollRef.once('value', snaps => {
      dispatch({ type: GET_ALL_POLLS_LOADING, loading: false });
      let polls = [];
      snaps.forEach(snap => {
        let { key } = snap;
        polls.push({ ...snap.val(), key });
      });
      polls.sort((a, b) => b.created_At - a.created_At);
      dispatch({ type: GET_ALL_POLLS_SUCCESS, polls });
    }, error => {
      console.log(error);
      dispatch({ type: GET_ALL_POLLS_ERROR, error });
    }
    );
  }
}

export function getSinglePoll(key) {
  return dispatch => {
    dispatch({ type: GET_SINGLE_POLL_LOADING, loading: true });

    let singlePoll = {};
    pollRef.child(key).once('value', snap => {
      singlePoll = snap.val();
      singlePoll.key = snap.key;

      userRef.child(singlePoll.author).once('value', snap => {
        dispatch({ type: GET_SINGLE_POLL_LOADING, loading: false });
        
        const { displayName, email, photoURL } = snap.val();
        singlePoll.author = { displayName, photoURL, email };
        dispatch({ type: GET_SINGLE_POLL_SUCCESS, singlePoll });
      }, error => dispatch({ type: GET_SINGLE_POLL_ERROR, error }));
    }, error => dispatch({ type: GET_SINGLE_POLL_ERROR, error }));
  }
}
