import { combineReducers } from 'redux';
import userInfo from './userInfoReducer';
import pageInfo from './pageInfoReducer';
import societyInfo from './societyInfoReducer';
import myActivities from './myActivitiesReducer';
import categories from './categoriesReducer';
import societyActivities from './societyActivitiesReducer';
import userProfile from './userProfileReducer';

const rootReducer = combineReducers({
  userInfo,
  pageInfo,
  myActivities,
  societyInfo,
  categories,
  societyActivities,
  userProfile,
});

export default rootReducer;
