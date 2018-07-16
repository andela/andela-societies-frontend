import {
  CREATE_REDEEM_POINTS_FAILURE,
  CREATE_REDEEM_POINTS_SUCCESS,
  CREATE_REDEEM_POINTS_REQUEST,
  FETCH_REDEMPTIONS_FAILURE,
  FETCH_REDEMPTIONS_REQUEST,
  FETCH_REDEMPTIONS_SUCCESS,
  UPDATE_REDEMPTION_REQUEST,
  UPDATE_REDEMPTION_FAILURE,
  UPDATE_REDEMPTION_SUCCESS,
  VERIFY_REDEMPTION_SUCCESS,
  VERIFY_REDEMPTION_FAILURE,
  VERIFY_REDEMPTION_REQUEST,
} from '../types';
import initialState from './initialState';

const redeemPointsReducer = (state = initialState.redemptionsInfo, action) => {
  switch (action.type) {
  case CREATE_REDEEM_POINTS_REQUEST:
  case UPDATE_REDEMPTION_REQUEST:
    return {
      ...state,
      message: {
        type: 'info',
        text: 'Sending ...',
      },
      requesting: true,
    };
  case CREATE_REDEEM_POINTS_SUCCESS:
    return {
      ...state,
      message: {
        type: 'success',
        text: action.redemption.message,
      },
      redemptions: [...state.redemptions, action.redemption.data],
      requesting: false,
    };
  case UPDATE_REDEMPTION_SUCCESS: {
    const redemptions = state.redemptions.map(redemption => (
      redemption.id !== action.redemption.id ? redemption : action.redemption
    ));
    return {
      ...state,
      message: {
        type: 'success',
        text: action.redemption.message,
      },
      redemptions,
      requesting: false,
    };
  }
  case CREATE_REDEEM_POINTS_FAILURE:
  case UPDATE_REDEMPTION_FAILURE:
    return {
      ...state,
      message: {
        type: 'error',
        text: action.error,
      },
      requesting: false,
    };
  case FETCH_REDEMPTIONS_REQUEST:
    return {
      ...state,
      requesting: true,
      hasError: false,
    };
  case FETCH_REDEMPTIONS_SUCCESS:
    return {
      ...state,
      redemptions: [...action.redemptions],
      requesting: false,
      hasError: false,
    };
  case FETCH_REDEMPTIONS_FAILURE:
    return {
      ...state,
      requesting: false,
      hasError: true,
    };
  case VERIFY_REDEMPTION_REQUEST:
    return {
      ...state,
      updating: true,
    };
  case VERIFY_REDEMPTION_SUCCESS: {
    const redemptions = state.redemptions.map(redemption => (
      redemption.id !== action.redemption.id ? redemption : action.redemption
    ));
    return { ...state, updating: false, redemptions };
  }
  case VERIFY_REDEMPTION_FAILURE:
    return {
      ...state,
      updating: false,
      hasError: true,
      error: action.error,
    };
  default:
    return state;
  }
};

export default redeemPointsReducer;
