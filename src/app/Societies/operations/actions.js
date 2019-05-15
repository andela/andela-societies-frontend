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

const verifyActivityRequest = (loggedActivityId, status) => ({
  type: types.VERIFY_ACTIVITY_REQUEST,
  loggedActivityId,
  status,
});

const verifyActivitySuccess = activity => ({
  type: types.VERIFY_ACTIVITY_SUCCESS,
  payload: activity,
});

const verifyActivityFail = error => ({
  type: types.VERIFY_ACTIVITY_FAIL,
  error,
});

const createRedemptionRequest = (data, societyName) => ({
  type: types.CREATE_REDEMPTION_REQUEST,
  payload: { data, societyName },
});

const createRedemptionSuccess = (redemption, societyName) => ({
  type: types.CREATE_REDEMPTION_SUCCESS,
  payload: { redemption, societyName },
});

const approveBudgetRequest = ({
  id, status, societyName,
}) => ({
  type: types.APPROVE_BUDGET_REQUEST,
  payload: {
    id,
    status,
    societyName,
  },
});

const approveBudgetSuccess = (redemption, societyName, status, message) => ({
  type: types.APPROVE_BUDGET_SUCCESS,
  payload: {
    redemption, societyName, status, message,
  },
});

const approveBudgetPageLoading = () => ({
  type: types.APPROVE_BUDGET_PAGE_LOADING,
});

const approveBudgetPageError = error => ({
  type: types.APPROVE_BUDGET_PAGE_ERROR,
  payload: { error },
});

const resetApproveBugetStatus = () => ({
  type: types.RESET_APPROVE_BUDGET_STATUS,
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
  verifyActivityFail,
  verifyActivitySuccess,
  verifyActivityRequest,
  approveBudgetRequest,
  approveBudgetSuccess,
  approveBudgetPageError,
  approveBudgetPageLoading,
  resetApproveBugetStatus,
};
