import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {
  myActivitiesGetRequest,
  myActivitiesGetFailure,
  myActivitiesGetSuccess,
  fetchMyActivities,
  updateActivitiesRequest,
  updateActivitiesRequestSuccess,
  updateActivitiesRequestFailure,
  updateActivity,
} from '../../src/actions/myActivitiesActions';
import activities from '../../src/fixtures/activities';
import activity from '../../src/fixtures/activity';
import {
  FETCH_MY_ACTIVITIES_REQUEST,
  FETCH_MY_ACTIVITIES_FAILURE,
  FETCH_MY_ACTIVITIES_SUCCESS,
  UPDATE_MY_ACTIVITIES_SUCCESS,
  UPDATE_MY_ACTIVITIES,
  UPDATE_MY_ACTIVITIES_FAILURE,

} from '../../src/types';
import config from '../../config';

const mockStore = configureMockStore([thunk]);
let store;

describe('myActivitiesGetRequest', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
  });
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

    return store.dispatch(fetchMyActivities('-Kabc')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch update myActivity request', () => {
    expect(updateActivitiesRequest()).toEqual({ type: UPDATE_MY_ACTIVITIES });
  });

  it('should dispatch update myActivity request success', () => {
    expect(updateActivitiesRequestSuccess()).toEqual({ type: UPDATE_MY_ACTIVITIES_SUCCESS });
  });

  it('should dispatch update myActivity request failure', () => {
    expect(updateActivitiesRequestFailure()).toEqual({ type: UPDATE_MY_ACTIVITIES_FAILURE });
  });

  it('should update an activity successfully', () => {
    moxios.stubRequest(`${config.API_BASE_URL}/logged-activities/${activity.id}`, {
      status: 200,
      response: {
        data: { ...activity },
        message: 'Activity succesfully updated',
      },
    });
    const expectedSuccessAction = {
      type: UPDATE_MY_ACTIVITIES_SUCCESS,
      activity: {
        ...activity,
      },
    };
    return store.dispatch(updateActivity(activity))
      .then(() => (expect(store.getActions()[1]).toEqual(expectedSuccessAction)));
  });

  it('should dispatch UPDATE_MY_ACTIVITIES_FAILURE if update activity failed', () => {
    moxios.stubRequest(`${config.API_BASE_URL}/logged-activities/${activity.id}`, {
      response: {
        message: 'There was an error',
      },
      status: 404,
    });

    const expectedFailureAction = {
      type: UPDATE_MY_ACTIVITIES_FAILURE,
      error: 'There was an error',
    };
    const updateData = activity;
    return store.dispatch(updateActivity(updateData))
      .then(() => (expect(store.getActions()[1]).toEqual(expectedFailureAction)));
  });
});
