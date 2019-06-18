import types from './types';

// sociey activities
const approveActivityRequest = (id, societyName) => ({
  type: types.APPROVE_ACTIVITY_REQUEST,
  payload: { id, societyName },
});

const approveActivitySuccess = (id, message, societyName, data) => ({
  type: types.APPROVE_ACTIVITY_SUCCESS,
  payload: {
    id,
    message,
    societyName,
    data,
  },
});

const approveActivityPageError = error => ({
  type: types.APPROVE_ACTIVITY_PAGE_ERROR,
  payload: { error },
});

const approveActivityPageLoading = () => ({
  type: types.APPROVE_ACTIVITY_PAGE_LOADING,
});

const resetApproveActivityStatus = () => ({
  type: types.RESET_APPROVE_ACTIVITY_STATUS,
});

const rejectActivityRequest = (id, status) => ({
  type: types.REJECT_ACTIVITY_REQUEST,
  payload: { id, status },
});

const rejectActivitySuccess = (id, message, societyName, data) => ({
  type: types.REJECT_ACTIVITY_SUCCESS,
  payload: {
    id,
    message,
    societyName,
    data,
  },
});

const rejectActivityPageError = error => ({
  type: types.REJECT_ACTIVITY_PAGE_ERROR,
  payload: { error },
});

const rejectActivityPageLoading = () => ({
  type: types.REJECT_ACTIVITY_PAGE_LOADING,
});

const resetRejectActivityStatus = () => ({
  type: types.RESET_REJECT_ACTIVITY_STATUS,
});

export default {
  approveActivityRequest,
  approveActivitySuccess,
  approveActivityPageError,
  approveActivityPageLoading,
  resetApproveActivityStatus,

  rejectActivityRequest,
  rejectActivitySuccess,
  rejectActivityPageError,
  rejectActivityPageLoading,
  resetRejectActivityStatus,
};
