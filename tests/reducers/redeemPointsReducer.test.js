// initial state
import initialState from '../../src/reducers/initialState';

// actions
import {
  createRedeemPointsRequest,
  createRedeemPointsSuccess,
  createRedeemPointsFailure,
} from '../../src/actions/redeemPointsAction';

// reducers
import redeemPointsReducer from '../../src/reducers/redeemPointsReducer';

// fixtures
import redemption from '../../src/fixtures/redemptions';

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
});
