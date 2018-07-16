import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {
  verifyRedemptionRequest,
  verifyRedemptionSuccess,
  verifyRedemptionFailure,
  verifyRedemption,
} from '../../src/actions/verifyRedemptionActions';
import {
  VERIFY_REDEMPTION_SUCCESS,
  VERIFY_REDEMPTION_FAILURE,
  VERIFY_REDEMPTION_REQUEST,
} from '../../src/types';
import storeFixture from '../../src/fixtures/store';
import { redemption } from '../../src/fixtures/redemptions';
import config from '../../config';

const mockStore = configureMockStore([thunk]);
let store;

describe('Verify Redemption Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should create an action to verify a redemption', () => {
    const expectedAction = {
      type: VERIFY_REDEMPTION_REQUEST,
    };
    expect(verifyRedemptionRequest()).toEqual(expectedAction);
  });

  it('should create an action with correct error', () => {
    const expectedAction = {
      type: VERIFY_REDEMPTION_FAILURE,
      error: { error: 500 },
    };
    expect(verifyRedemptionFailure({ error: 500 })).toEqual(expectedAction);
  });

  it('should create a success action after successfully verifying a redemption request', () => {
    const expectedAction = {
      type: VERIFY_REDEMPTION_SUCCESS,
      redemption,
    };
    expect(verifyRedemptionSuccess(redemption)).toEqual(expectedAction);
  });

  it('dispatches VERIFY_REDEMPTION_SUCCESS after successfuly updating the redemption status', () => {
    store = mockStore({ redeemPointsInfo: storeFixture.redeemPointsInfo });

    const expectedActions = [
      {
        type: VERIFY_REDEMPTION_REQUEST,
      },
      {
        type: VERIFY_REDEMPTION_SUCCESS,
        redemption,
      },
    ];

    moxios.stubRequest(`${config.API_BASE_URL}/societies/redeem/${redemption.id}`, {
      status: 200,
      response: { data: redemption },
    });

    return store.dispatch(verifyRedemption(redemption.id, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches VERIFY_REDEMPTION_SUCCESS after successfuly updating the redemption status to rejected', () => {
    store = mockStore({ redeemPointsInfo: storeFixture.redeemPointsInfo });

    const expectedActions = [
      {
        type: VERIFY_REDEMPTION_REQUEST,
      },
      {
        type: VERIFY_REDEMPTION_SUCCESS,
        redemption,
      },
    ];

    moxios.stubRequest(`${config.API_BASE_URL}/societies/redeem/${redemption.id}`, {
      status: 200,
      response: { data: redemption },
    });

    return store.dispatch(verifyRedemption(redemption.id, 'rejected', 'Insubstantial reason')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches VERIFY_REDEMPTION_SUCCESS after when requesting for more information', () => {
    store = mockStore({ redeemPointsInfo: storeFixture.redeemPointsInfo });

    const expectedActions = [
      {
        type: VERIFY_REDEMPTION_REQUEST,
      },
      {
        type: VERIFY_REDEMPTION_SUCCESS,
        redemption,
      },
    ];

    moxios.stubRequest(`${config.API_BASE_URL}/societies/redeem/${redemption.id}`, {
      status: 200,
      response: { data: redemption },
    });

    return store.dispatch(verifyRedemption(redemption.id, 'moreInfo', 'Elaborate')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches VERIFY_REDEMPTION_FAILURE when updating the redemption fails', () => {
    store = mockStore({ redeemPointsInfo: storeFixture.redeemPointsInfo });

    const expectedActions = [
      {
        type: VERIFY_REDEMPTION_REQUEST,
      },
      {
        type: VERIFY_REDEMPTION_FAILURE,
        error: new Error('Request failed with status code 401'),
      },
    ];

    moxios.stubRequest(`${config.API_BASE_URL}/societies/redeem/${redemption.id}`, {
      status: 401,
      response: {},
    });

    return store.dispatch(verifyRedemption(redemption.id, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
