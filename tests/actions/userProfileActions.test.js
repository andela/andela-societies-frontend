import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {
  requestUserProfile,
  requestUserProfileFailure,
  requestUserProfileSuccess,
  fetchUserProfile,
} from '../../src/actions/userProfileActions';
import {
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
} from '../../src/types';
import testProfile from '../../src/fixtures/userProfile';
import storeFixture from '../../src/fixtures/store';
import config from '../../config';

const mockStore = configureMockStore([thunk]);
const userId = '-Kabcd';
let store;

describe('Fetch User Profile', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should create an action to fetch user\'s profile', () => {
    const expectedAction = {
      type: FETCH_USER_PROFILE_REQUEST,
    };
    expect(requestUserProfile()).toEqual(expectedAction);
  });

  it('should create an action to set error when get request fails', () => {
    const expectedAction = {
      type: FETCH_USER_PROFILE_FAILURE,
      error: { error: 500 },
    };
    expect(requestUserProfileFailure({ error: 500 })).toEqual(expectedAction);
  });

  it('should create a success action after successfully fetching the user profile', () => {
    const expectedAction = {
      type: FETCH_USER_PROFILE_SUCCESS,
      profile: testProfile,
    };
    expect(requestUserProfileSuccess(testProfile)).toEqual(expectedAction);
  });

  it('dispatches FETCH_USER_PROFILE_SUCCESS after successfuly fetching the user profile', () => {
    store = mockStore({ userProfile: storeFixture.userProfile });
    const expectedActions = [
      {
        type: FETCH_USER_PROFILE_REQUEST,
      },
      {
        type: FETCH_USER_PROFILE_SUCCESS,
        profile: testProfile,
      },
    ];


    moxios.stubRequest(`${config.API_BASE_URL}/users/${userId}`, {
      status: 200,
      response: { data: testProfile },
    });

    return store.dispatch(fetchUserProfile(userId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches FETCH_USER_PROFILE_FAILURE when fetching user profile fails', () => {
    const expectedActions = [
      {
        type: FETCH_USER_PROFILE_REQUEST,
      },
      {
        type: FETCH_USER_PROFILE_FAILURE,
        error: new Error('Request failed with status code 401'),
      },
    ];

    store = mockStore({ userProfile: storeFixture.userProfile });
    moxios.stubRequest(`${config.API_BASE_URL}/users/${userId}`, {
      status: 401,
      response: {},
    });

    return store.dispatch(fetchUserProfile(userId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
