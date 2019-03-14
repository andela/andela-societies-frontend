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
  case types.CATEGORIES_SUCCESS:
    return {
      ...state,
      categories: action.categories.data,
    };
  case types.LOG_POINTS_REQUEST:
    return {
      ...state,
    };
  case types.LOG_POINTS_SUCCESS:
    return {
      ...state,
      activity: action.activity,
    };
  case types.LOG_POINTS_FAIL:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default dashboard;
