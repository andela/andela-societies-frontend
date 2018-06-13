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
});
