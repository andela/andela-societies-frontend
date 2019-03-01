import { combineReducers } from 'redux';
import { dashboard } from '../app/Dashboard/operations';

const rootReducer = combineReducers({
  dashboard,
});

export default rootReducer;
