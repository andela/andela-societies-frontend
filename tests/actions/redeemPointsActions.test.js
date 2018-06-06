import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

// actions
import {
  createRedeemPointsRequest,
  createRedeemPointsFailure,
  redeemPoints,
} from '../../src/actions/redeemPointsAction';

// types
import {
  CREATE_REDEEM_POINTS_FAILURE,
  CREATE_REDEEM_POINTS_REQUEST,
  CREATE_REDEEM_POINTS_SUCCESS,
} from '../../src/types';

// helpers
import config from '../../config';
import redemption from '../../src/fixtures/redemptions';
import testProfile from '../../src/fixtures/userProfile';

const mockStore = configureMockStore([thunk]);
let store;
const societyId = testProfile.society.id;

describe('Redeem Points Actions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
  });
  afterEach(() => moxios.uninstall());

  it('should dispatch redeem points request', () => {
    expect(createRedeemPointsRequest()).toEqual({ type: CREATE_REDEEM_POINTS_REQUEST });
  });

  it('should dispatch redeem points failure', () => {
    expect(createRedeemPointsFailure()).toEqual({ type: CREATE_REDEEM_POINTS_FAILURE });
  });

  it('should create a redeemption successfuly', () => {
    moxios.stubRequest(`${config.API_BASE_URL}/societies/redeem/${societyId}`, {
      status: 200,
      response: {
        data: { ...redemption },
        message: 'Redemption request succesfully added.',
      },
    });

    const expectedSuccessAction = {
      type: CREATE_REDEEM_POINTS_SUCCESS,
      redemption: {
        data: { ...redemption },
        message: 'Redemption request succesfully added.',
      },
    };
    const redemptionData = {
      center: 'Nairobi',
      points: '50',
      reason: 'good reason for this',
    };
    return store.dispatch(redeemPoints(redemptionData, societyId))
      .then(() => (expect(store.getActions()[1]).toEqual(expectedSuccessAction)));
  });

  it('should call createRedeemPointsFailure when there is a error', () => {
    moxios.stubRequest(`${config.API_BASE_URL}/societies/redeem/${societyId}`, {
      status: 400,
      response: {
        message: 'There was an error while processing your request.',
      },
    });

    const expectedFailureAction = {
      type: CREATE_REDEEM_POINTS_FAILURE,
      error: 'There was an error while processing your request.',
    };
    const redemptionData = {
      center: 'Nairobi',
      points: '50',
      reason: 'good reason for this',
    };
    return store.dispatch(redeemPoints(redemptionData, societyId))
      .then(() => (expect(store.getActions()[1]).toEqual(expectedFailureAction)));
  });
});
