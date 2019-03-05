import types from './types';

const societyPageLoading = () => ({
  type: types.SOCIETY_PAGE_LOADING,
});

const societyPageError = () => ({
  type: types.SOCIETY_PAGE_ERROR,
});

const fetchSocietyInfoRequest = societyName => ({
  type: types.FETCH_SOCIETY_INFO_REQUEST,
  payload: societyName,
});

const fetchSocietyInfoSuccess = (pointsEarned, usedPoints, remainingPoints, loggedActivities, activitiesLogged) => ({
  type: types.FETCH_SOCIETY_INFO_SUCCESS,
  payload: {
    pointsEarned,
    usedPoints,
    remainingPoints,
    loggedActivities,
    activitiesLogged,
  },
});

export default {
  societyPageError,
  societyPageLoading,
  fetchSocietyInfoRequest,
  fetchSocietyInfoSuccess,
};
