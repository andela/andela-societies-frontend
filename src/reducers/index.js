import { combineReducers } from 'redux';
import userInfo from './userInfoReducer';
import pageInfo from './pageInfoReducer';
import societyInfo from './societyInfoReducer';
import myActivities from './myActivitiesReducer';
import categories from './categoriesReducer';

const rootReducer = combineReducers({
  userInfo,
  pageInfo,
  myActivities,
  societyInfo,
  categories,
});

export default rootReducer;
