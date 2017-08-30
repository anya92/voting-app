import { combineReducers } from 'redux';
import { polls, loadingPolls, errorPolls } from './polls_reducer';
import { singlePoll, loadingSinglePoll, errorSinglePoll } from './singlePoll_reducer';

export default combineReducers({
  polls,
  loadingPolls,
  errorPolls,
  singlePoll,
  loadingSinglePoll,
  errorSinglePoll
});
