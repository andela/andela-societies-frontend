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

const loadCategories = () => ({
  type: types.CATEGORIES.LOAD,
});

const setCategories = categories => ({
  type: types.CATEGORIES.LOAD_SUCCESS,
  categories,
});

const setError = error => ({
  type: types.CATEGORIES.LOAD_FAIL,
  error,
});

const logPointsRequest = activity => ({
  type: types.LOG_POINTS.POST_REQUEST,
  activity,
});

const logPointsSuccess = activity => ({
  type: types.LOG_POINTS.POST_SUCCESS,
  activity,
});

const logPointsFail = error => ({
  type: types.LOG_POINTS.POST_FAIL,
  error,
});

export default {
  fetchUserActivitiesError,
  fetchUserActivitiesRequest,
  fetchUserActivitiesSuccess,
  logPointsRequest,
  logPointsSuccess,
  logPointsFail,
  setCategories,
  setError,
  loadCategories,
};
