import { combineReducers } from 'redux';
import { dashboard } from '../app/Dashboard/operations';
import * as home from '../app/Home';

const rootReducer = combineReducers({
  home,
  dashboard,
});

export default rootReducer;
