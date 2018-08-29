import societyActivitiesReducer from '../../src/reducers/societyActivitiesReducer';
import {
  FETCH_SOCIETY_INFO_REQUEST,
  FETCH_SOCIETY_INFO_SUCCESS,
  FETCH_SOCIETY_INFO_FAILURE,
} from '../../src/types';
import store from '../../src/fixtures/store';
import info from '../../src/fixtures/society';

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
});
