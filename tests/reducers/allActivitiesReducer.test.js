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

let expectedOutput;
const error = new Error('Request failed with status code 400');

describe('All activities reducer', () => {
  const initialState = store.allActivities;

  it('should set default initial state', () => {
    expect(allActivities(undefined, {})).toEqual(initialState);
  });

  it('should return default initial state when no action is provided', () => {
    expect(allActivities(initialState, {})).toEqual(initialState);
  });

  it('should return requesting state true when FETCH_ALL_ACTIVITIES_REQUEST action is fired ', () => {
    expectedOutput = {
      ...initialState,
      requesting: true,
    };
    expect(allActivities(initialState, fetchAllActivitiesRequests())).toEqual(expectedOutput);
  });

  it('should handle FETCH_ALL_ACTIVITIES_SUCCESS case', () => {
    expectedOutput = {
      ...initialState,
      requesting: false,
      activities,
    };
    expect(allActivities(initialState, fetchAllActivitiesSuccess(activities))).toEqual(expectedOutput);
  });

  it('should handle FETCH_ALL_ACTIVITIES_FAILURE case', () => {
    expectedOutput = {
      ...initialState,
      requesting: false,
      error,
    };
    expect(allActivities(initialState, fetchAllActivitiesFailure(error))).toEqual(expectedOutput);
  });

  it('should handle VERIFY_ACTIVITY_REQUEST', () => {
    expect(allActivities(initialState, {
      type: VERIFY_ACTIVITY_REQUEST,
    })).toEqual({
      ...initialState,
      updating: true,
    });
  });

  it('should handle VERIFY_ACTIVITY_FAILURE', () => {
    expect(allActivities(initialState, {
      type: VERIFY_ACTIVITY_FAILURE,
      error: { error: 404 },
    })).toEqual({
      ...initialState,
      updating: false,
      error: { error: 404 },
      activities: store.societyActivities.activities,
    });
  });

  it('should handle VERIFY_ACTIVITY_SUCCESS', () => {
    initialState.activities = info.loggedActivities;
    initialState.activities.push(activity);
    activity.status = 'pending';
    const newActivities = info.loggedActivities;
    expect(allActivities(initialState, {
      type: VERIFY_ACTIVITY_SUCCESS,
      activity,
    })).toEqual({
      ...initialState,
      updating: false,
      activities: newActivities,
    });
  });

  it('should handle VERIFY_ACTIVITY_OPS_REQUEST', () => {
    expectedOutput = {
      ...initialState,
      updating: true,
    };
    expect(allActivities(initialState, { type: VERIFY_ACTIVITY_OPS_REQUEST })).toEqual(expectedOutput);
  });

  it('should handle VERIFY_ACTIVITY_OPS_FAILURE', () => {
    expectedOutput = {
      ...initialState,
      error,
    };
    expect(allActivities(initialState, verifyActivitiesOpsFailure(error))).toEqual(expectedOutput);
  });

  it('should handle VERIFY_ACTIVITY_OPS_SUCCESS', () => {
    const activityIds = ['bnfad176-43cd-11e8-b3b9-9801a7ae0329'];
    initialState.activities = info.loggedActivities;
    const result = allActivities(initialState, verifyActivitiesOpsSuccess(approvedActivities, activityIds));
    expect(result.activities[0]).toEqual(approvedActivities[0]);
  });
});
