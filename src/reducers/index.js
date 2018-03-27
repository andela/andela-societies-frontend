import { combineReducers } from 'redux';
import userInfo from './userInfoReducer';
import pageInfo from './pageInfoReducer';

const rootReducer = combineReducers({
  userInfo,
  pageInfo,
});

export default rootReducer;
