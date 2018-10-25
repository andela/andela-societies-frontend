import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

// actions
import {
  verifyActivityRequest,
  verifyActivitySuccess,
  verifyActivityFailure,
  verifyActivity,
  approveActivityByOpsFailure,
  approveActivityByOpsRequest,
  approveActivityByOps,
  rejectActivityByOps,
} from '../../src/actions/verifyActivityActions';

// types
import {
  VERIFY_ACTIVITY_SUCCESS,
  VERIFY_ACTIVITY_FAILURE,
  VERIFY_ACTIVITY_REQUEST,
  REJECT_ACTIVITY_BY_OPS_FAILURE,
  REJECT_ACTIVITY_BY_OPS_REQUEST,
  REJECT_ACTIVITY_BY_OPS_SUCCESS,
  APPROVE_ACTIVITY_BY_OPS_FAILURE,
  APPROVE_ACTIVITY_BY_OPS_REQUEST,
  APPROVE_ACTIVITY_BY_OPS_SUCCESS
} from '../../src/types';

// fixtures
import activity from '../../src/fixtures/activity';
import { approvedActivities } from '../../src/fixtures/society';

// constants
import clickActions from './../../src/constants/clickAction';

// config
import config from '../../config';

const mockStore = configureMockStore([thunk]);
let store;

describe('Verify Activity Actions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
  });
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

  it('dispatches VERIFY_ACTIVITY_SUCCESS after successfuly updating the activity status to rejected', () => {
    const expectedActions = [
      {
        type: VERIFY_ACTIVITY_REQUEST,
      },
      {
        type: VERIFY_ACTIVITY_SUCCESS,
        activity,
      },
    ];

    moxios.stubRequest(`${config.API_BASE_URL}/logged-activities/review/${activity.id}`, {
      status: 200,
      response: { data: activity },
    });

    return store.dispatch(verifyActivity(clickActions.REJECT, activity.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches VERIFY_ACTIVITY_FAILURE when updating the activity fails', () => {
    const expectedActions = [
      {
        type: VERIFY_ACTIVITY_REQUEST,
      },
      {
        type: VERIFY_ACTIVITY_FAILURE,
        error: new Error('Request failed with status code 401'),
      },
    ];

    moxios.stubRequest(`${config.API_BASE_URL}/logged-activities/review/${activity.id}`, { status: 401 });

    return store.dispatch(verifyActivity(clickActions.APPROVE, activity.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches REJECT_ACTIVITY_BY_OPS_SUCCESS after successfuly rejecting an activity ', () => {
    const expectedActions = [
      {
        type: REJECT_ACTIVITY_BY_OPS_REQUEST,
      },
      {
        type: REJECT_ACTIVITY_BY_OPS_SUCCESS,
        activity,
      },
    ];
  
    moxios.stubRequest(`${config.API_BASE_URL}/logged-activities/reject/${activity.id}`, {
      status: 200,
      response: { data: activity },
    });
  
    return store.dispatch(rejectActivityByOps(clickActions.REJECT, activity.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  
  it('dispatches REJECT_ACTIVITY_BY_OPS_FAILURE when rejecting an activity fails', () => {
    const error = new Error('Request failed with status code 401');
    const expectedActions = [
      {
        type: REJECT_ACTIVITY_BY_OPS_REQUEST,
      },
      {
        type: REJECT_ACTIVITY_BY_OPS_FAILURE,
        error,
      },
    ];
  
    moxios.stubRequest(`${config.API_BASE_URL}/logged-activities/reject/${activity.id}`, { status: 401 });
  
    return store.dispatch(rejectActivityByOps(clickActions.REJECT, activity.id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates APPROVE_ACTIVITY_BY_OPS_REQUEST action', () => {
    expect(approveActivityByOpsRequest()).toEqual({ type: APPROVE_ACTIVITY_BY_OPS_REQUEST });
  });

  it('creates APPROVE_ACTIVITY_BY_OPS_FAILURE action', () => {
    const error = 'There was an error while processing your request.';
    expect(approveActivityByOpsFailure(error)).toEqual({ type: APPROVE_ACTIVITY_BY_OPS_FAILURE, error });
  });

  it('dispatches APPROVE_ACTIVITY_BY_OPS_SUCCESS action when verifying activities is successful', () => {
    const activityIds = ['bnfad176-43cd-11e8-b3b9-9801a7ae0329'];
    const expectedActions = [
      {
        type: APPROVE_ACTIVITY_BY_OPS_REQUEST,
      },
      {
        type: APPROVE_ACTIVITY_BY_OPS_SUCCESS,
        activities: approvedActivities,
        activityIds,
      },
    ];

    moxios.stubRequest(`${config.API_BASE_URL}/logged-activities/approve/`, {
      status: 200,
      response: { data: approvedActivities },
    });

    return store.dispatch(approveActivityByOps(activityIds)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('dispatches APPROVE_ACTIVITY_BY_OPS_FAILURE action when verifying activities is unsuccessful', () => {
    const activityIds = ['bnfad176-43cd-11e8-b3b9-9801a7ae0329'];
    const expectedActions = [
      {
        type: APPROVE_ACTIVITY_BY_OPS_REQUEST,
      },
      {
        type: APPROVE_ACTIVITY_BY_OPS_FAILURE,
        error: new Error('Request failed with status code 400'),
      },
    ];

    moxios.stubRequest(`${config.API_BASE_URL}/logged-activities/approve/`, {
      status: 400,
    });

    return store.dispatch(approveActivityByOps(activityIds)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
