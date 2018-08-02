// initial state
import initialState from '../../src/reducers/initialState';

// actions
import {
  createRedeemPointsRequest,
  createRedeemPointsSuccess,
  createRedeemPointsFailure,
  fetchRedemptionsRequest,
  fetchRedemptionsSuccess,
  updateRedemptionRequest,
  updateRedemptionSuccess,
} from '../../src/actions/redeemPointsAction';

import {
  verifyRedemptionRequest,
  verifyRedemptionSuccess,
  verifyRedemptionFailure,
} from '../../src/actions/verifyRedemptionActions';


// types
import { FETCH_REDEMPTIONS_FAILURE } from '../../src/types';

// reducers
import redeemPointsReducer from '../../src/reducers/redeemPointsReducer';

// fixtures
import { redemption, redemptions } from '../../src/fixtures/redemptions';

const defaultState = initialState.redemptionsInfo;

describe('Redeem points reducer', () => {
  it('should return default initial state when no action is provided', () => {
    expect(redeemPointsReducer(defaultState, {})).toEqual(defaultState);
  });

  it('should return reqesting state true when CREATE_REDEEM_POINTS_REQUEST action is provided', () => {
    const expectedOutput = {
      ...defaultState,
      message: {
        type: 'info',
        text: 'Sending ...',
      },
      requesting: true,
    };
    expect(redeemPointsReducer(defaultState, createRedeemPointsRequest())).toEqual(expectedOutput);
  });

  it('should create redemption successfully ', () => {
    const expectedOutput = {
      ...defaultState,
      message: {
        type: 'success',
        text: 'Redemption request succesfully added.',
      },
      redemptions: [{ ...redemption }],
      requesting: false,
    };
    const redemptionData = {
      data: { ...redemption },
      message: 'Redemption request succesfully added.',
    };
    const createRedeemPointsSuccessAction = createRedeemPointsSuccess(redemptionData);
    expect(redeemPointsReducer(defaultState, createRedeemPointsSuccessAction)).toEqual(expectedOutput);
  });

  it('should return hasError state true when CREATE_REDEEM_POINTS_FAILURE action is provided', () => {
    const error = new Error('An error has occurred while processing your request.');
    const expectedOutput = {
      ...defaultState,
      message: {
        type: 'error',
        text: 'An error has occurred while processing your request.',
      },
      error,
      hasError: true,
    };
    expect(redeemPointsReducer(defaultState, createRedeemPointsFailure(error))).toEqual(expectedOutput);
  });

  it('should return reqesting state true when FETCH_REDEMPTIONS_REQUEST action is provided', () => {
    const expectedOutput = {
      ...defaultState,
      requesting: true,
    };
    expect(redeemPointsReducer(defaultState, fetchRedemptionsRequest())).toEqual(expectedOutput);
  });

  it('should fetch redemptions successfully', () => {
    const expectedOutput = {
      ...defaultState,
      redemptions,
      requesting: false,
    };
    expect(redeemPointsReducer(defaultState, fetchRedemptionsSuccess(redemptions))).toEqual(expectedOutput);
  });

  it('should return hasError state true when FETCH_REDEMPTIONS_FAILURE action is provided', () => {
    const expectedOutput = {
      ...defaultState,
      hasError: true,
    };
    expect(redeemPointsReducer(defaultState, { type: FETCH_REDEMPTIONS_FAILURE })).toEqual(expectedOutput);
  });

  it('should return hasError state true when FETCH_REDEMPTIONS_FAILURE action is provided', () => {
    const expectedOutput = {
      ...defaultState,
      hasError: true,
    };
    expect(redeemPointsReducer(defaultState, { type: FETCH_REDEMPTIONS_FAILURE })).toEqual(expectedOutput);
  });

  it('should set updating to true for VERIFY_REDEMPTION_REQUEST', () => {
    expect(redeemPointsReducer(defaultState, verifyRedemptionRequest())).toEqual({
      ...defaultState,
      updating: true,
    });
  });

  it('should return redemption with updated status for VERIFY_REDEMPTION_SUCCESS', () => {
    defaultState.redemptions = [...redemptions, redemption];
    redemption.status = 'approved';
    const expectedOutput = {
      ...defaultState,
      requesting: false,
      hasError: false,
      redemptions: [...redemptions, redemption],
    };
    expect(redeemPointsReducer(defaultState, verifyRedemptionSuccess(redemption))).toEqual(expectedOutput);
  });

  it('should set error for VERIFY_REDEMPTION_FAILURE', () => {
    const expectedOutput = {
      ...defaultState,
      hasError: true,
      error: { error: 404 },
    };
    expect(redeemPointsReducer(defaultState, verifyRedemptionFailure({ error: 404 }))).toEqual(expectedOutput);
  });

  // Update Redemptions
  it('should return requesting state true when UPDATE_REDEMPTION_REQUEST action is provided', () => {
    const expectedOutput = {
      ...defaultState,
      message: {
        type: 'info',
        text: 'Sending ...',
      },
      requesting: true,
    };
    expect(redeemPointsReducer(defaultState, updateRedemptionRequest())).toEqual(expectedOutput);
  });

  it('should update redemption successfully ', () => {
    const updatedRedemption = {
      ...redemption,
      reason: 'For t-shirts edited',
    };
    const updateRedemptionSuccessAction = updateRedemptionSuccess(updatedRedemption);
    const newRedemptions = defaultState.redemptions.map((r) => {
      if (r.id === redemption.id) {
        return updatedRedemption;
      }
      return r;
    });

    const expectedOutput = {
      ...defaultState,
      message: {
        type: 'success',
        text: 'Successfully edited redemption',
      },
      redemptions: newRedemptions,
      requesting: false,
    };
    expect(redeemPointsReducer(defaultState, updateRedemptionSuccessAction)).toEqual(expectedOutput);
  });
});
