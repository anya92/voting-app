import {
  GET_SINGLE_POLL_LOADING,
  GET_SINGLE_POLL_SUCCESS,
  GET_SINGLE_POLL_ERROR
} from '../actions/actionTypes';

export const singlePoll = (state = [], action) => {
  switch (action.type) {
    case GET_SINGLE_POLL_SUCCESS:
      const { singlePoll } = action;
      return singlePoll;
    default:
      return state;    
  }
}

export const loadingSinglePoll = (state = false, action) => {
  switch (action.type) {
    case GET_SINGLE_POLL_LOADING:
      const { loading } = action;
      return loading;
    default:
      return state;  
  }
}

export const errorSinglePoll = (state = null, action) => {
  switch(action.type) {
    case GET_SINGLE_POLL_ERROR:
      const { error } = action;
      return error;
    default:
      return state;  
  }
}
