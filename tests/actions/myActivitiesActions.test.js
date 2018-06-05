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
    };
    expect(myActivitiesGetRequest()).toEqual(expectedAction);
  });

  it('should create an action to set error when fetching my activities', () => {
    const error = new Error('Request failed with status code 401');
    const expectedAction = {
      type: FETCH_MY_ACTIVITIES_FAILURE,
      error,
    };
    expect(myActivitiesGetFailure(error)).toEqual(expectedAction);
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

  it('dispatches FETCH_MY_ACTIVITIES_FAILURE when fetchActivities fails', () => {
    moxios.stubRequest(`${config.API_BASE_URL}/users/-Kabc/logged-activities`, {
      status: 404,
      response: {},
    });

    const expectedActions = [
      {
        type: FETCH_MY_ACTIVITIES_REQUEST,
      },
      {
        type: FETCH_MY_ACTIVITIES_FAILURE,
        error: new Error('Request failed with status code 404', 404),
      },
    ];

    const store = mockStore({ myActivities: [] });

    return store.dispatch(fetchMyActivities('-Kabc')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
