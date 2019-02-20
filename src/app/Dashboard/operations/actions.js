import types from './types';

const fetchUserActivitiesRequest = userId => ({
  type: types.FETCH_USER_ACTIVITIES_REQUEST,
  userId,
});

const fetchUserActivitiesSuccess = (activities, pointsEarned, activitiesLogged, society) => ({
  society,
  activities,
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
