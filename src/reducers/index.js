import { combineReducers } from 'redux';
import { sidebar } from '../app/Sidebar/operations';
import { society } from '../app/Societies/operations';
import { dashboard } from '../app/Dashboard/operations';
import { navbar } from '../app/Navbar/operations';
import { activities } from '../app/SocietyActivities/operations';

const rootReducer = combineReducers({
  society,
  sidebar,
  dashboard,
  navbar,
  activities,
});

export default rootReducer;
