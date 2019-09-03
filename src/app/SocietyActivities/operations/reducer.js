import types from './types';
import initialState from '../../../reducers/initialState';

const activities = (state = initialState.society, { type, payload }) => {
  switch (type) {
  case types.APPROVE_ACTIVITY_SUCCESS: {
    const {
      id,
      message,
      societyName,
      data,
    } = payload;
    return {
      ...state,
      approveActivityPageLoading: false,
      approveActivityStatus: data.status,
      approveActivityMessage: message,
      [societyName]: {
        ...state[societyName],
        loggedActivities: state[societyName]
          .loggedActivities.map(item => (item.id === id ? data : item)),
      },
    };
  }
  case types.APPROVE_ACTIVITY_PAGE_LOADING:
    return {
      ...state,
      approveActivityPageError: null,
      approveActivityPageLoading: true,
    };
  case types.APPROVE_ACTIVITY_PAGE_ERROR:
    return {
      ...state,
      approveActivityPageLoading: false,
      approveActivityPageError: payload.error,
    };
  case types.RESET_APPROVE_ACTIVITY_STATUS:
    return {
      ...state,
      approveActivityStatus: null,
      approveActivityMessage: null,
    };
  case types.REJECT_ACTIVITY_SUCCESS: {
    const {
      id,
      message,
      societyName,
      data,
    } = payload;
    return {
      ...state,
      rejectActivityPageLoading: false,
      rejectActivityStatus: data.status,
      rejectActivityMessage: message,
      [societyName]: {
        ...state[societyName],
        loggedActivities: state[societyName]
          .loggedActivities.map(item => (item.id === id ? data : item)),
      },
    };
  }
  case types.REJECT_ACTIVITY_PAGE_LOADING:
    return {
      ...state,
      rejectActivityPageError: null,
      rejectActivityPageLoading: true,
    };
  case types.REJECT_ACTIVITY_PAGE_ERROR:
    return {
      ...state,
      rejectActivityPageLoading: false,
      rejectActivityPageError: payload.error,
    };
  case types.RESET_REJECT_ACTIVITY_STATUS:
    return {
      ...state,
      rejectActivityStatus: null,
      rejectActivityMessage: null,
    };
  default:
    return state;
  }
};

export default activities;
