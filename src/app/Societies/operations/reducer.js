import types from './types';
import initialState from '../../../reducers/initialState';

const society = (state = initialState.society, action) => {
  switch (action.type) {
  case types.SOCIETY_PAGE_LOADING:
    return {
      ...state,
      loading: true,
    };
  case types.SOCIETY_PAGE_ERROR:
    return {
      ...state,
      error: true,
    };
  case types.FETCH_SOCIETY_INFO_SUCCESS:
    return {
      ...state,
      pointsEarned: action.payload.pointsEarned,
      usedPoints: action.payload.usedPoints,
      remainingPoints: action.payload.remainingPoints,
      loggedActivities: action.payload.loggedActivities,
      activitiesLogged: action.payload.activitiesLogged,
    };
  default:
    return state;
  }
};

export default society;
