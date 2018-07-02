// initial state
import initialState from '../../src/reducers/initialState';

// actions
import {
  createRedeemPointsRequest,
  createRedeemPointsSuccess,
  createRedeemPointsFailure,
  fetchRedemptionsRequest,
  fetchRedemptionsSuccess,
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

  it('should return reqesting state false when CREATE_REDEEM_POINTS_FAILURE action is provided', () => {
    const error = 'There was an error while processing your request.';
    const expectedOutput = {
      ...defaultState,
      message: {
        type: 'error',
        text: 'There was an error while processing your request.',
      },
      requesting: false,
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

  it('should set updating to true for FETCH_REDEMPTIONS_REQUEST', () => {
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
});
