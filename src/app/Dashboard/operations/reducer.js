import types from './types';
import initialState from '../../../reducers/initialState';

const dashboard = (state = initialState.dashboard, action) => {
  switch (action.type) {
  case types.FETCH_USER_ACTIVITIES_REQUEST:
    return {
      ...state,
      loading: true,
    };
  case types.FETCH_USER_ACTIVITIES_SUCCESS:
    return {
      ...state,
      loading: false,
      society: action.society,
      pointsEarned: action.pointsEarned,
      userActivities: action.activities,
      activitiesLogged: action.activitiesLogged,
    };
  case types.FETCH_USER_ACTIVITIES_ERROR:
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  case types.CATEGORIES.LOAD_SUCCESS:
    return {
      ...state,
      categories: action.categories.data,
    };
  case types.LOG_POINTS.POST_SUCCESS:
    return {
      ...state,
      activity: action.activity,
    };
  default:
    return state;
  }
};

export default dashboard;
