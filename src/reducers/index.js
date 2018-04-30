import { combineReducers } from 'redux';
import userInfo from './userInfoReducer';
import pageInfo from './pageInfoReducer';
import myActivities from './myActivitiesReducer';

const rootReducer = combineReducers({
  userInfo,
  pageInfo,
  myActivities,
});

export default rootReducer;
