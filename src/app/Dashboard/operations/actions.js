import types from './types';

const fetchUserActivitiesRequest = userId => ({
  type: types.FETCH_USER_ACTIVITIES_REQUEST,
  userId,
});

const fetchUserActivitiesSuccess = (activites, pointsEarned, activitiesLogged, society) => ({
  society,
  activites,
  pointsEarned,
  activitiesLogged,
  type: types.FETCH_USER_ACTIVITIES_SUCCESS,
});

const fetchUserActivitiesError = error => ({
  type: types.FETCH_USER_ACTIVITIES_ERROR,
  error,
});

export default {
  fetchUserActivitiesError,
  fetchUserActivitiesRequest,
  fetchUserActivitiesSuccess,
};
