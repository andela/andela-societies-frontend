import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {
  createActivityRequest,
  createActivityFailure,
  createActivitySuccess,
  createActivity,
} from '../../src/actions/activityActions';
import activity from '../../src/fixtures/activity';
import {
  CREATE_ACTIVITY_REQUEST,
  CREATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_FAILURE,

} from '../../src/types';
import config from '../../config';

const mockStore = configureMockStore([thunk]);

const formData = {
  activityTypeId: 'as78a7s8asasas89',
  date: '2018-06-10',
  description: 'activity description',
};

describe('LogActivityRequest', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should create an action to create an activity', () => {
    const expectedAction = {
      type: CREATE_ACTIVITY_REQUEST,
    };
    expect(createActivityRequest()).toEqual(expectedAction);
  });

  it('should create an action to set error when create activity fails', () => {
    const error = new Error('Request failed with status code 401');
    const expectedAction = {
      type: CREATE_ACTIVITY_FAILURE,
      error,
    };
    expect(createActivityFailure(error)).toEqual(expectedAction);
  });

  it('should create a success action after successfully creating an activity', () => {
    const expectedAction = {
      type: CREATE_ACTIVITY_SUCCESS,
      activity,
    };
    expect(createActivitySuccess(activity)).toEqual(expectedAction);
  });

  it('dispatches CREATE_ACTIVITY_SUCCESS after successfuly creating an activity', () => {
    moxios.stubRequest(`${config.API_BASE_URL}/logged-activities`, {
      status: 200,
      response: { data: activity },
    });

    const expectedActions = [
      {
        type: CREATE_ACTIVITY_REQUEST,
      },
      {
        type: CREATE_ACTIVITY_SUCCESS,
        activity,
      },
    ];

    const store = mockStore({ myActivities: {} });

    return store.dispatch(createActivity(formData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches CREATE_ACTIVITY_FAILURE when createActivity fails', () => {
    moxios.stubRequest(`${config.API_BASE_URL}/logged-activities`, {
      status: 404,
      response: {},
    });

    const expectedActions = [
      {
        type: CREATE_ACTIVITY_REQUEST,
      },
      {
        type: CREATE_ACTIVITY_FAILURE,
        error: new Error('Request failed with status code 404', 404),
      },
    ];

    const store = mockStore({ myActivities: {} });

    return store.dispatch(createActivity(formData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
