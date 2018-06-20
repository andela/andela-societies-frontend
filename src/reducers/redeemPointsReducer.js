import {
  CREATE_REDEEM_POINTS_FAILURE,
  CREATE_REDEEM_POINTS_SUCCESS,
  CREATE_REDEEM_POINTS_REQUEST,
} from '../types';
import initialState from './initialState';

const redeemPointsReducer = (state = initialState.redemptionsInfo, action) => {
  switch (action.type) {
  case CREATE_REDEEM_POINTS_REQUEST:
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
  case CREATE_REDEEM_POINTS_FAILURE:
    return {
      ...state,
      message: {
        type: 'error',
        text: action.error,
      },
      requesting: false,
    };
  default:
    return state;
  }
};

export default redeemPointsReducer;
