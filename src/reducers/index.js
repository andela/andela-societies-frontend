import { combineReducers } from 'redux';
import { society } from '../app/Societies/operations';
import { dashboard } from '../app/Dashboard/operations';
import * as home from '../app/Home';

const rootReducer = combineReducers({
  home,
  society,
  dashboard,
});

export default rootReducer;
