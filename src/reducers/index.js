import { combineReducers } from 'redux';
import userInfo from './userInfoReducer';

const rootReducer = combineReducers({
  userInfo,
});

export default rootReducer;
