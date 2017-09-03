import { combineReducers } from 'redux';
import { polls, loadingPolls, errorPolls } from './polls_reducer';
import { singlePoll, loadingSinglePoll, errorSinglePoll } from './singlePoll_reducer';
import { topPolls, loadingTopPolls, errorTopPolls } from './topPolls_reducer';
import { userPolls, loadingUserPolls, errorUserPolls } from './userPolls_reducer';

export default combineReducers({
  polls,
  loadingPolls,
  errorPolls,
  singlePoll,
  loadingSinglePoll,
  errorSinglePoll,
  topPolls,
  loadingTopPolls,
  errorTopPolls,
  userPolls,
  loadingUserPolls,
  errorUserPolls
});
