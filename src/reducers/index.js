import { combineReducers } from 'redux';
import { polls, loadingPolls, errorPolls } from './polls_reducer';

export default combineReducers({
  polls,
  loadingPolls,
  errorPolls
});
