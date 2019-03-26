import { combineReducers } from 'redux';
import { society } from '../app/Societies/operations';
import { dashboard } from '../app/Dashboard/operations';

const rootReducer = combineReducers({
  society,
  dashboard,
});

export default rootReducer;
