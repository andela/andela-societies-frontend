import { combineReducers } from 'redux';
import { sidebar } from '../app/Sidebar/operations';
import { society } from '../app/Societies/operations';
import { dashboard } from '../app/Dashboard/operations';

const rootReducer = combineReducers({
  society,
  sidebar,
  dashboard,
});

export default rootReducer;
