import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {
  myActivitiesGetRequest,
  myActivitiesGetFailure,
  myActivitiesGetSuccess,
  fetchMyActivities,
} from '../../src/actions/myActivitiesActions';
import activities from '../../src/fixtures/activities';
import {
  FETCH_MY_ACTIVITIES_REQUEST,
  FETCH_MY_ACTIVITIES_FAILURE,
  FETCH_MY_ACTIVITIES_SUCCESS,

} from '../../src/types';
import config from '../../config';

const mockStore = configureMockStore([thunk]);

describe('myActivitiesGetRequest', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should create an action to get user activities', () => {
    const expectedAction = {
      type: FETCH_MY_ACTIVITIES_REQUEST,
      requesting: true,
    };
    expect(myActivitiesGetRequest(true)).toEqual(expectedAction);
  });

  it('should create an action to set error when fetching my activities', () => {
    const expectedAction = {
      type: FETCH_MY_ACTIVITIES_FAILURE,
      failed: true,
    };
    expect(myActivitiesGetFailure(true)).toEqual(expectedAction);
  });

  it('should create a success action after successfully fetching my activities', () => {
    const expectedAction = {
      type: FETCH_MY_ACTIVITIES_SUCCESS,
      activities,
    };
    expect(myActivitiesGetSuccess(activities)).toEqual(expectedAction);
  });

  it('dispatches FETCH_MY_ACTIVITIES_SUCCESS after successfuly fetching activities', () => {
    moxios.stubRequest(`${config.API_BASE_URL}/users/-Kabc/logged-activities`, {
      status: 200,
      response: { data: activities },
    });

    const expectedActions = [
      {
        type: FETCH_MY_ACTIVITIES_REQUEST,
        requesting: true,
      },
      {
        type: FETCH_MY_ACTIVITIES_REQUEST,
        requesting: false,
      },
      {
        type: FETCH_MY_ACTIVITIES_SUCCESS,
        activities,
      },
    ];

    const store = mockStore({ myActivities: [] });

    return store.dispatch(fetchMyActivities('-Kabc')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches FETCH_MY_ACTIVITIES_FAILURE after successfuly fetching activities', () => {
    moxios.stubRequest(`${config.API_BASE_URL}/users/-Kabc/logged-activities`, {
      status: 404,
      response: {},
    });

    const expectedActions = [
      {
        type: FETCH_MY_ACTIVITIES_REQUEST,
        requesting: true,
      },
      {
        type: FETCH_MY_ACTIVITIES_FAILURE,
        failed: true,
      },
    ];

    const store = mockStore({ myActivities: [] });

    return store.dispatch(fetchMyActivities('-Kabc')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
