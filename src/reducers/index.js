import { combineReducers } from 'redux';
import { login } from '../app/Login/operations';
import { dashboard } from '../app/Dashboard/operations';
import * as home from '../app/Home';

const rootReducer = combineReducers({
  home,
  login,
  dashboard
});

export default rootReducer;
