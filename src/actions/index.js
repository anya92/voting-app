import {
  GET_ALL_POLLS_LOADING,
  GET_ALL_POLLS_SUCCESS,
  GET_ALL_POLLS_ERROR,
  GET_SINGLE_POLL_LOADING,
  GET_SINGLE_POLL_SUCCESS,
  GET_SINGLE_POLL_ERROR,
  GET_TOP_POLLS_LOADING,
  GET_TOP_POLLS_SUCCESS,
  GET_TOP_POLLS_ERROR,
  GET_USER_POLLS_LOADING,
  GET_USER_POLLS_SUCCESS,
  GET_USER_POLLS_ERROR
} from './actionTypes';

import { pollRef, userRef } from '../firebase';

export function getAllPolls() {
  return dispatch => {
    dispatch({ type: GET_ALL_POLLS_LOADING, loading: true });

    pollRef.once('value', snaps => {
      let polls = [];
      snaps.forEach(snap => {
        let { key } = snap;
        polls.push({ ...snap.val(), key });
      });
      polls.sort((a, b) => b.created_At - a.created_At);

      dispatch({ type: GET_ALL_POLLS_LOADING, loading: false });
      dispatch({ type: GET_ALL_POLLS_SUCCESS, polls });
    }, error => {
      console.log(error);
      dispatch({ type: GET_ALL_POLLS_ERROR, error: true });
    }
    );
  }
}

export function getSinglePoll(key) {
  return dispatch => {
    dispatch({ type: GET_SINGLE_POLL_LOADING, loading: true });

    let singlePoll = {};
    pollRef.child(key).on('value', snap => {
      // when key is invalid
      if (!snap.val()) {
        dispatch({ type: GET_SINGLE_POLL_ERROR, error: true });
        return;
      }
      singlePoll = snap.val();
      singlePoll.key = snap.key;
      const uid = singlePoll.author;
     
      userRef.child(uid).once('value').then(snap => {
        const { displayName, email, photoURL } = snap.val();
        singlePoll.author = { displayName, photoURL, email, uid };
        
        dispatch({ type: GET_SINGLE_POLL_ERROR, error: false });
        dispatch({ type: GET_SINGLE_POLL_LOADING, loading: false });
        dispatch({ type: GET_SINGLE_POLL_SUCCESS, singlePoll });
      }, error => dispatch({ type: GET_SINGLE_POLL_ERROR, error: true }));
    }, error => dispatch({ type: GET_SINGLE_POLL_ERROR, error: true }));
  }
}

export function getTopPolls() {
  return dispatch => {
    dispatch({ type: GET_TOP_POLLS_LOADING, loading: true });

    pollRef
      .orderByChild('numberOfVotes')
      .limitToLast(10)
      .once('value')
      .then(snaps => {
        let topPolls = [];
        snaps.forEach(snap => {
          let { key } = snap;
          topPolls.push({ ...snap.val(), key });
        });
        topPolls.reverse();
        dispatch({ type: GET_TOP_POLLS_LOADING, loading: false});
        dispatch({ type: GET_TOP_POLLS_SUCCESS, topPolls });
      })
      .catch(error => dispatch({ type: GET_TOP_POLLS_ERROR, error: true }));
  }
}

export function getUserPolls(uid) {
  return dispatch => {
    dispatch({ type: GET_USER_POLLS_LOADING, loading: true });

    pollRef.on('value', snaps => {
      let userPolls = [];
      snaps.forEach(snap => {
        if (snap.val().author === uid) {
          let { key } = snap;
          userPolls.push({ ...snap.val(), key });
        }
      });
      dispatch({ type: GET_USER_POLLS_LOADING, loading: false });
      dispatch({ type: GET_USER_POLLS_SUCCESS, userPolls });
    }, error => {
      dispatch({ type: GET_USER_POLLS_ERROR, error: true });
    }
    );
  }
}
