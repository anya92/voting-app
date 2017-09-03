import {
  GET_TOP_POLLS_LOADING,
  GET_TOP_POLLS_SUCCESS,
  GET_TOP_POLLS_ERROR
} from '../actions/actionTypes';

export const topPolls = (state = [], action) => {
  switch (action.type) {
    case GET_TOP_POLLS_SUCCESS:
      const { topPolls } = action;
      return topPolls;
    default:
      return state;    
  }
}

export const loadingTopPolls = (state = false, action) => {
  switch (action.type) {
    case GET_TOP_POLLS_LOADING:
      const { loading } = action;
      return loading;
    default:
      return state;  
  }
}

export const errorTopPolls = (state = false, action) => {
  switch(action.type) {
    case GET_TOP_POLLS_ERROR:
      const { error } = action;
      return error;
    default:
      return state;  
  }
}
