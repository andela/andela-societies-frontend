import types from './types';

const societyPageLoading = () => ({
  type: types.SOCIETY_PAGE_LOADING,
});

const societyPageError = error => ({
  type: types.SOCIETY_PAGE_ERROR,
  payload: { error },
});

const fetchSocietyInfoRequest = societyName => ({
  type: types.FETCH_SOCIETY_INFO_REQUEST,
  payload: { societyName },
});

const fetchSocietyInfoSuccess = (
  societyName,
  pointsEarned,
  usedPoints,
  remainingPoints,
  loggedActivities,
  activitiesLogged,
) => ({
  type: types.FETCH_SOCIETY_INFO_SUCCESS,
  payload: {
    societyName,
    pointsEarned,
    usedPoints,
    remainingPoints,
    loggedActivities,
    activitiesLogged,
  },
});

const fetchSocietyRedemptionsRequest = societyName => ({
  type: types.FETCH_SOCIETY_REDEMPTIONS_REQUEST,
  payload: { societyName },
});

const fetchSocietyRedemptionsSuccess = (redemptions, societyName) => ({
  type: types.FETCH_SOCIETY_REDEMPTIONS_SUCCESS,
  payload: { redemptions, societyName },
});

const createRedemptionRequest = (data, societyName) => ({
  type: types.CREATE_REDEMPTION_REQUEST,
  payload: { data, societyName },
});

const createRedemptionSuccess = (redemption, societyName) => ({
  type: types.CREATE_REDEMPTION_SUCCESS,
  payload: { redemption, societyName },
});

export default {
  societyPageError,
  societyPageLoading,
  fetchSocietyInfoRequest,
  fetchSocietyInfoSuccess,
  createRedemptionRequest,
  createRedemptionSuccess,
  fetchSocietyRedemptionsRequest,
  fetchSocietyRedemptionsSuccess,
};
