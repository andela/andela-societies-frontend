import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {
  verifyActivityRequest,
  verifyActivitySuccess,
  verifyActivityFailure,
  verifyActivity,
  verifyActivitiesOpsRequest,
  verifyActivitiesOpsFailure,
  verifyActivitiesOps,
} from '../../src/actions/verifyActivityActions';
import {
  VERIFY_ACTIVITY_SUCCESS,
  VERIFY_ACTIVITY_FAILURE,
  VERIFY_ACTIVITY_REQUEST,
  VERIFY_ACTIVITY_OPS_REQUEST,
  VERIFY_ACTIVITY_OPS_FAILURE,
  VERIFY_ACTIVITY_OPS_SUCCESS,
} from '../../src/types';
import storeFixture from '../../src/fixtures/store';
import activity from '../../src/fixtures/activity';
import { approvedActivities } from '../../src/fixtures/society';
import config from '../../config';

const mockStore = configureMockStore([thunk]);
let store;

describe('Verify Activity Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should create an action to verify an activity', () => {
    const expectedAction = {
      type: VERIFY_ACTIVITY_REQUEST,
    };
    expect(verifyActivityRequest()).toEqual(expectedAction);
  });

  it('should create an action to set error when PUT request fails', () => {
    const expectedAction = {
      type: VERIFY_ACTIVITY_FAILURE,
      error: { error: 500 },
    };
    expect(verifyActivityFailure({ error: 500 })).toEqual(expectedAction);
  });

  it('should create a success action after successfully verifying the activity', () => {
    const expectedAction = {
      type: VERIFY_ACTIVITY_SUCCESS,
      activity,
    };
    expect(verifyActivitySuccess(activity)).toEqual(expectedAction);
  });

  it('dispatches VERIFY_ACTIVITY_SUCCESS after successfuly updating the activity status', () => {
    store = mockStore({ societyActivities: storeFixture.societyActivities });

    const expectedActions = [
      {
        type: VERIFY_ACTIVITY_REQUEST,
      },
      {
        type: VERIFY_ACTIVITY_SUCCESS,
        activity,
      },
    ];

    moxios.stubRequest(`${config.API_BASE_URL}/logged-activities/${activity.id}`, {
      status: 200,
      response: { data: activity },
    });

    return store.dispatch(verifyActivity(true, activity.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches VERIFY_ACTIVITY_SUCCESS after successfuly updating the activity status to rejected', () => {
    store = mockStore({ societyActivities: storeFixture.societyActivities });

    const expectedActions = [
      {
        type: VERIFY_ACTIVITY_REQUEST,
      },
      {
        type: VERIFY_ACTIVITY_SUCCESS,
        activity,
      },
    ];

    moxios.stubRequest(`${config.API_BASE_URL}/logged-activities/${activity.id}`, {
      status: 200,
      response: { data: activity },
    });

    return store.dispatch(verifyActivity(false, activity.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches VERIFY_ACTIVITY_FAILURE when updating the activity fails', () => {
    store = mockStore({ societyActivities: storeFixture.societyActivities });

    const expectedActions = [
      {
        type: VERIFY_ACTIVITY_REQUEST,
      },
      {
        type: VERIFY_ACTIVITY_FAILURE,
        error: new Error('Request failed with status code 401'),
      },
    ];

    moxios.stubRequest(`${config.API_BASE_URL}/logged-activities/${activity.id}`, {
      status: 401,
      response: {},
    });

    return store.dispatch(verifyActivity(true, activity.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates VERIFY_ACTIVITY_OPS_REQUEST action', () => {
    expect(verifyActivitiesOpsRequest()).toEqual({ type: VERIFY_ACTIVITY_OPS_REQUEST });
  });

  it('creates VERIFY_ACTIVITY_OPS_FAILURE action', () => {
    const error = 'There was an error while processing your request.';
    expect(verifyActivitiesOpsFailure(error)).toEqual({ type: VERIFY_ACTIVITY_OPS_FAILURE, error });
  });

  it('dispatches VERIFY_ACTIVITY_OPS_SUCCES action when verifying activities is successful', () => {
    store = mockStore({ societyActivities: storeFixture.societyActivities });
    const activityIds = ['bnfad176-43cd-11e8-b3b9-9801a7ae0329'];
    const expectedActions = [
      {
        type: VERIFY_ACTIVITY_OPS_REQUEST,
      },
      {
        type: VERIFY_ACTIVITY_OPS_SUCCESS,
        activities: approvedActivities,
        activityIds,
      },
    ];

    moxios.stubRequest(`${config.API_BASE_URL}/logged-activities`, {
      status: 200,
      response: { data: approvedActivities },
    });

    return store.dispatch(verifyActivitiesOps(activityIds)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches VERIFY_ACTIVITY_OPS_FAILURE action when verifying activities is unsuccessful', () => {
    store = mockStore({ societyActivities: storeFixture.societyActivities });
    const activityIds = ['bnfad176-43cd-11e8-b3b9-9801a7ae0329'];
    const expectedActions = [
      {
        type: VERIFY_ACTIVITY_OPS_REQUEST,
      },
      {
        type: VERIFY_ACTIVITY_OPS_FAILURE,
        error: new Error('Request failed with status code 400'),
      },
    ];

    moxios.stubRequest(`${config.API_BASE_URL}/logged-activities`, {
      status: 400,
    });

    return store.dispatch(verifyActivitiesOps(activityIds)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
