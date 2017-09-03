import {
  GET_USER_POLLS_LOADING,
  GET_USER_POLLS_SUCCESS,
  GET_USER_POLLS_ERROR
} from '../actions/actionTypes';

export const userPolls = (state = [], action) => {
  switch (action.type) {
    case GET_USER_POLLS_SUCCESS:
      const { userPolls } = action;
      return userPolls;
    default:
      return state;    
  }
}

export const loadingUserPolls = (state = false, action) => {
  switch (action.type) {
    case GET_USER_POLLS_LOADING:
      const { loading } = action;
      return loading;
    default:
      return state;  
  }
}

export const errorUserPolls = (state = false, action) => {
  switch(action.type) {
    case GET_USER_POLLS_ERROR:
      const { error } = action;
      return error;
    default:
      return state;  
  }
}
