import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {
  societyInfoGetRequest,
  societyInfoGetFailure,
  societyInfoGetSuccess,
  fetchSocietyInfo,
} from '../../src/actions/societyInfoActions';
import {
  GET_SOCIETY_INFO_REQUEST,
  GET_SOCIETY_INFO_SUCCESS,
  GET_SOCIETY_INFO_FAILURE,
} from '../../src/types';
import info from '../../src/fixtures/society';
import storeFixture from '../../src/fixtures/store';
import config from '../../config';

const mockStore = configureMockStore([thunk]);

describe('Fetch Society information', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should create an action to fetch society information', () => {
    const expectedAction = {
      type: GET_SOCIETY_INFO_REQUEST,
    };
    expect(societyInfoGetRequest()).toEqual(expectedAction);
  });

  it('should create an action to set error when get request fails', () => {
    const expectedAction = {
      type: GET_SOCIETY_INFO_FAILURE,
      error: { error: 500 },
    };
    expect(societyInfoGetFailure({ error: 500 })).toEqual(expectedAction);
  });

  it('should create a success action after successfully fetching society info', () => {
    const expectedAction = {
      type: GET_SOCIETY_INFO_SUCCESS,
      info,
    };
    expect(societyInfoGetSuccess(info)).toEqual(expectedAction);
  });

  it('dispatches GET_SOCIETY_INFO_SUCCESS after successfuly fetching society info', () => {
    moxios.stubRequest(`${config.API_BASE_URL}/societies?name=invictus`, {
      status: 200,
      response: { societyDetails: info },
    });

    const expectedActions = [
      {
        type: GET_SOCIETY_INFO_REQUEST,
      },
      {
        type: GET_SOCIETY_INFO_SUCCESS,
        info,
      },
    ];

    const store = mockStore({ societyInfo: storeFixture.societyInfo });

    return store.dispatch(fetchSocietyInfo('invictus')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches GET_SOCIETY_INFO_FAILURE when fetch society info fails', () => {
    moxios.stubRequest(`${config.API_BASE_URL}/societies?name=invictus`, {
      status: 500,
      response: {},
    });

    const expectedActions = [
      {
        type: GET_SOCIETY_INFO_REQUEST,
      },
      {
        type: GET_SOCIETY_INFO_FAILURE,
        error: new Error('Request failed with status code 500'),
      },
    ];

    const store = mockStore({ societyInfo: storeFixture.societyInfo });

    return store.dispatch(fetchSocietyInfo('invictus')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
