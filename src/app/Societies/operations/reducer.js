import types from './types';
import initialState from '../../../reducers/initialState';

const society = (state = initialState.society, { type, payload }) => {
  switch (type) {
  case types.SOCIETY_PAGE_LOADING:
    return {
      ...state,
      loading: true,
    };
  case types.SOCIETY_PAGE_ERROR:
    return {
      ...state,
      error: payload.error,
    };
  case types.FETCH_SOCIETY_INFO_SUCCESS:
    return {
      ...state,
      pointsEarned: payload.pointsEarned,
      usedPoints: payload.usedPoints,
      remainingPoints: payload.remainingPoints,
      loggedActivities: payload.loggedActivities,
      activitiesLogged: payload.activitiesLogged,
    };
  case types.FETCH_SOCIETY_REDEMPTIONS_SUCCESS:
    return {
      ...state,
      redemptions: payload.redemptions,
    };
  default:
    return state;
  }
};

export default society;
