import { combineReducers } from 'redux';
import userInfo from './userInfoReducer';
import pageInfo from './pageInfoReducer';
import societyInfo from './societyInfoReducer';
import myActivities from './myActivitiesReducer';

const rootReducer = combineReducers({
  userInfo,
  pageInfo,
  myActivities,
  societyInfo,
});

export default rootReducer;
