import types from './types';

const fetchUserActivitiesRequest = () => ({
  type: types.FETCH_USER_ACTIVITIES_REQUEST
});

const fetchUserActivitiesSuccess = (activites, pointsEarned, activitiesLogged) => ({
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
}
