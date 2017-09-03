import {
  GET_ALL_POLLS_LOADING,
  GET_ALL_POLLS_SUCCESS,
  GET_ALL_POLLS_ERROR
} from '../actions/actionTypes';

export const polls = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_POLLS_SUCCESS:
      const { polls } = action;
      return polls;
    default:
      return state;    
  }
}

export const loadingPolls = (state = false, action) => {
  switch (action.type) {
    case GET_ALL_POLLS_LOADING:
      const { loading } = action;
      return loading;
    default:
      return state;  
  }
}

export const errorPolls = (state = false, action) => {
  switch(action.type) {
    case GET_ALL_POLLS_ERROR:
      const { error } = action;
      return error;
    default:
      return state;  
  }
}
