import societyActivitiesReducer from '../../src/reducers/societyActivitiesReducer';
import {
  FETCH_SOCIETY_INFO_REQUEST,
  FETCH_SOCIETY_INFO_SUCCESS,
  FETCH_SOCIETY_INFO_FAILURE,
  VERIFY_ACTIVITY_SUCCESS,
  VERIFY_ACTIVITY_FAILURE,
  VERIFY_ACTIVITY_REQUEST,
  VERIFY_ACTIVITY_OPS_REQUEST,
} from '../../src/types';
import { verifyActivitiesOpsFailure, verifyActivitiesOpsSuccess } from '../../src/actions/verifyActivityActions';
import store from '../../src/fixtures/store';
import activity from '../../src/fixtures/activity';
import info, { approvedActivities } from '../../src/fixtures/society';

describe('societyActivitiesReducer', () => {
  const initialState = store.societyActivities;

  it('should set default initial state', () => {
    expect(societyActivitiesReducer(undefined, {})).toEqual(initialState);
  });

  it('should return initial state when action is not defined', () => {
    expect(societyActivitiesReducer(initialState, { type: 'DOES_NOT_EXIST' })).toEqual(initialState);
  });

  it('should handle FETCH_SOCIETY_INFO_REQUEST', () => {
    expect(societyActivitiesReducer(initialState, {
      type: FETCH_SOCIETY_INFO_REQUEST,
    })).toEqual({
      requesting: true,
      updating: false,
      error: {},
      activities: store.societyInfo.info.loggedActivities,
    });
  });

  it('should handle FETCH_SOCIETY_INFO_FAILURE', () => {
    expect(societyActivitiesReducer(initialState, {
      type: FETCH_SOCIETY_INFO_FAILURE,
      error: { error: 404 },
    })).toEqual({
      requesting: false,
      updating: false,
      error: { error: 404 },
      activities: store.societyInfo.info.loggedActivities,
    });
  });

  it('should handle FETCH_SOCIETY_INFO_SUCCESS', () => {
    expect(societyActivitiesReducer(initialState, {
      type: FETCH_SOCIETY_INFO_SUCCESS,
      info,
    })).toEqual({
      requesting: false,
      updating: false,
      error: {},
      activities: info.loggedActivities,
    });
  });

  it('should handle VERIFY_ACTIVITY_REQUEST', () => {
    expect(societyActivitiesReducer(initialState, {
      type: VERIFY_ACTIVITY_REQUEST,
    })).toEqual({
      requesting: false,
      updating: true,
      error: {},
      activities: store.societyActivities.activities,
    });
  });

  it('should handle VERIFY_ACTIVITY_FAILURE', () => {
    expect(societyActivitiesReducer(initialState, {
      type: VERIFY_ACTIVITY_FAILURE,
      error: { error: 404 },
    })).toEqual({
      requesting: false,
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
    expect(societyActivitiesReducer(initialState, {
      type: VERIFY_ACTIVITY_SUCCESS,
      activity,
    })).toEqual({
      requesting: false,
      updating: false,
      error: {},
      activities: newActivities,
    });
  });

  it('should handle VERIFY_ACTIVITY_OPS_REQUEST', () => {
    const expectedOutput = {
      ...initialState,
      updating: true,

    };
    expect(societyActivitiesReducer(initialState, { type: VERIFY_ACTIVITY_OPS_REQUEST })).toEqual(expectedOutput);
  });

  it('should handle VERIFY_ACTIVITY_OPS_FAILURE', () => {
    const error = 'There was an error while processing your request.';
    const expectedOutput = {
      ...initialState,
      updating: false,
      error,
    };
    expect(societyActivitiesReducer(initialState, verifyActivitiesOpsFailure(error))).toEqual(expectedOutput);
  });

  it('should handle VERIFY_ACTIVITY_OPS_SUCCESS', () => {
    const activityIds = ['bnfad176-43cd-11e8-b3b9-9801a7ae0329'];
    initialState.activities = info.loggedActivities;
    const result = societyActivitiesReducer(initialState, verifyActivitiesOpsSuccess(approvedActivities, activityIds));
    expect(result.activities[0]).toEqual(approvedActivities[0]);
  });
});
