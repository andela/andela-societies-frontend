import types from './types';
import initialState from '../../../reducers/initialState';

const society = (state = initialState.society, { type, payload }) => {
  switch (type) {
  case types.SOCIETY_PAGE_LOADING:
    return {
      ...state,
      loading: true,
    };
  case types.SOCIETY_PAGE_ERROR:
    return {
      ...state,
      error: payload.error,
    };
  case types.FETCH_SOCIETY_INFO_SUCCESS: {
    const {
      societyName, pointsEarned, usedPoints, remainingPoints, loggedActivities, activitiesLogged,
    } = payload;
    return {
      ...state,
      [societyName]: {
        ...state[societyName],
        pointsEarned,
        usedPoints,
        remainingPoints,
        loggedActivities,
        activitiesLogged,
      },
      inReview: loggedActivities.filter(activity => activity.status === 'in review'),
    };
  }
  case types.FETCH_SOCIETY_REDEMPTIONS_SUCCESS: {
    const { societyName } = payload;
    return {
      ...state,
      [societyName]: {
        ...state[societyName],
        redemptions: payload.redemptions,
      },
    };
  }
  case types.VERIFY_ACTIVITY_SUCCESS: {
    const societyName = payload.data.society.name;
    return {
      ...state,
      [societyName]: {
        ...state[societyName],
        loggedActivities: state[societyName].loggedActivities
          .filter(activity => activity.activityId !== payload.data.activityId),
      },
      verifiedSecretaryActivity: {
        owner: payload.data.owner,
        points: payload.data.points,
      },
    };
  }
  case types.VERIFY_ALERT_OPEN:
    return {
      ...state,
      verifyAlertMessage: true,
    };
  case types.VERIFY_ALERT_CLOSE:
    return {
      ...state,
      verifyAlertMessage: false,
      verifiedSecretaryActivity: {},
    };
  case types.CREATE_REDEMPTION_SUCCESS: {
    const { societyName } = payload;
    return {
      ...state,
      [societyName]: {
        ...state[societyName],
        redemptions: [payload.redemption, ...state[societyName].redemptions],
      },
    };
  }

  case types.APPROVE_BUDGET_SUCCESS: {
    const { societyName } = payload;
    return {
      ...state,
      approveBudgetPageLoading: false,
      approveBudgetStatus: payload.status,
      approveBudgetMessage: payload.message,
      [societyName]: {
        ...state[societyName],
        redemptions: state[societyName]
          .redemptions.map(el => (el.id === payload.redemption.id ? payload.redemption : el)),
      },
    };
  }
  case types.APPROVE_BUDGET_PAGE_LOADING:
    return {
      ...state,
      approveBudgetPageError: null,
      approveBudgetPageLoading: true,
    };
  case types.APPROVE_BUDGET_PAGE_ERROR:
    return {
      ...state,
      approveBudgetPageLoading: false,
      approveBudgetPageError: payload.error,
    };
  case types.RESET_APPROVE_BUDGET_STATUS:
    return {
      ...state,
      approveBudgetStatus: null,
      approveBudgetMessage: null,
    };
  default:
    return state;
  }
};

export default society;
