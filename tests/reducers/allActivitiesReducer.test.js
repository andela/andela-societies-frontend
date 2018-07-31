// initial state
import initialState from '../../src/reducers/initialState';

// actions
import {
  fetchAllActivitiesFailure,
  fetchAllActivitiesRequests,
  fetchAllActivitiesSuccess,
} from '../../src/actions/allActivitiesActions';
import {
  verifyActivitiesOpsSuccess,
  verifyActivitiesOpsFailure,
} from '../../src/actions/verifyActivityActions';

// types
import {
  VERIFY_ACTIVITY_SUCCESS,
  VERIFY_ACTIVITY_FAILURE,
  VERIFY_ACTIVITY_REQUEST,
  VERIFY_ACTIVITY_OPS_REQUEST,
} from '../../src/types';

// reducer
import allActivities from '../../src/reducers/allActivitiesReducer';

// fixtures
import activities from '../../src/fixtures/activities';
import activity from '../../src/fixtures/activity';
import info, { approvedActivities } from '../../src/fixtures/society';
import store from '../../src/fixtures/store';

const defaultState = initialState.allActivities;
let expectedOutput;
const error = new Error('Request failed with status code 400');

describe('All activities reducer', () => {
  it('should return default initial state when no action is provided', () => {
    expect(allActivities(defaultState, {})).toEqual(defaultState);
  });

  it('should return requesting state true when FETCH_ALL_ACTIVITIES_REQUEST action is fired ', () => {
    expectedOutput = {
      ...defaultState,
      requesting: true,
    };
    expect(allActivities(defaultState, fetchAllActivitiesRequests())).toEqual(expectedOutput);
  });

  it('should handle FETCH_ALL_ACTIVITIES_SUCCESS case', () => {
    expectedOutput = {
      ...defaultState,
      requesting: false,
      activities,
    };
    expect(allActivities(defaultState, fetchAllActivitiesSuccess(activities))).toEqual(expectedOutput);
  });

  it('should handle FETCH_ALL_ACTIVITIES_FAILURE case', () => {
    expectedOutput = {
      ...defaultState,
      requesting: false,
      error,
    };
    expect(allActivities(defaultState, fetchAllActivitiesFailure(error))).toEqual(expectedOutput);
  });

  it('should handle VERIFY_ACTIVITY_REQUEST', () => {
    expect(allActivities(defaultState, {
      type: VERIFY_ACTIVITY_REQUEST,
    })).toEqual({
      ...defaultState,
      updating: true,
    });
  });

  it('should handle VERIFY_ACTIVITY_FAILURE', () => {
    expect(allActivities(defaultState, {
      type: VERIFY_ACTIVITY_FAILURE,
      error: { error: 404 },
    })).toEqual({
      ...defaultState,
      updating: false,
      error: { error: 404 },
      activities: store.societyActivities.activities,
    });
  });

  it('should handle VERIFY_ACTIVITY_SUCCESS', () => {
    defaultState.activities = info.loggedActivities;
    defaultState.activities.push(activity);
    activity.status = 'pending';
    const newActivities = info.loggedActivities;
    expect(allActivities(defaultState, {
      type: VERIFY_ACTIVITY_SUCCESS,
      activity,
    })).toEqual({
      ...defaultState,
      updating: false,
      activities: newActivities,
    });
  });

  it('should handle VERIFY_ACTIVITY_OPS_REQUEST', () => {
    const expectedOutput = {
      ...defaultState,
      updating: true
    };
    expect(allActivities(defaultState, { type: VERIFY_ACTIVITY_OPS_REQUEST })).toEqual(expectedOutput);
  });

  it('should handle VERIFY_ACTIVITY_OPS_FAILURE', () => {
    const expectedOutput = {
      ...defaultState,
      error,
    };
    expect(allActivities(defaultState, verifyActivitiesOpsFailure(error))).toEqual(expectedOutput);
  });

  it('should handle VERIFY_ACTIVITY_OPS_SUCCESS', () => {
    const activityIds = ['bnfad176-43cd-11e8-b3b9-9801a7ae0329'];
    defaultState.activities = info.loggedActivities;
    const result = allActivities(defaultState, verifyActivitiesOpsSuccess(approvedActivities, activityIds));
    expect(result.activities[0]).toEqual(approvedActivities[0]);
  });
});


