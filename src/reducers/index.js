import { combineReducers } from 'redux';
import userInfo from './userInfoReducer';
import pageInfo from './pageInfoReducer';
import societyInfo from './societyInfoReducer';
import myActivities from './myActivitiesReducer';
import categories from './categoriesReducer';
import societyActivities from './societyActivitiesReducer';
import allActivities from './allActivitiesReducer';
import userProfile from './userProfileReducer';
import redeemPointsInfo from './redeemPointsReducer';

const rootReducer = combineReducers({
  userInfo,
  pageInfo,
  myActivities,
  societyInfo,
  categories,
  societyActivities,
  userProfile,
  redeemPointsInfo,
  allActivities,
});

export default rootReducer;
