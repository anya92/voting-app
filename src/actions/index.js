import {
  GET_ALL_POLLS_LOADING,
  GET_ALL_POLLS_SUCCESS,
  GET_ALL_POLLS_ERROR
} from './actionTypes';

import { pollRef } from '../firebase';

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
      dispatch({ type: GET_ALL_POLLS_ERROR, error })
    }
    );
  }
}
