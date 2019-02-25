import { CATEGORIES, LOG_POINTS } from './constants';

const loadCategories = () => ({
  type: CATEGORIES.LOAD,
});

const setCategories = categories => ({
  type: CATEGORIES.LOAD_SUCCESS,
  categories,
});

const setError = error => ({
  type: CATEGORIES.LOAD_FAIL,
  error,
});

const logPointsRequest = activity => ({
  type: LOG_POINTS.POST_REQUEST,
  activity,
});

const logPointsSuccess = activity => ({
  type: LOG_POINTS.POST_SUCCESS,
  activity,
});

const logPointsFail = error => ({
  type: LOG_POINTS.POST_FAIL,
  error,
});

export default {
  loadCategories,
  setCategories,
  setError,
  logPointsFail,
  logPointsRequest,
  logPointsSuccess,
};
