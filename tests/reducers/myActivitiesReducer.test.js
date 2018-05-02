import myActivitiesReducer from '../../src/reducers/myActivitiesReducer';
import {
  FETCH_MY_ACTIVITIES_REQUEST,
  FETCH_MY_ACTIVITIES_SUCCESS,
  FETCH_MY_ACTIVITIES_FAILURE,
} from '../../src/types';
import activities from '../../src/fixtures/activities';
import store from '../../src/fixtures/store';

describe('myActivitiesReducer', () => {
  const initialState = store.myActivities;

  it('should return the initial state when the action is not handled', () => {
    expect(myActivitiesReducer(initialState, { type: 'DOES_NOT_EXIST' })).toEqual(initialState);
  });

  it('should handle FETCH_MY_ACTIVITIES_REQUEST', () => {
    expect(myActivitiesReducer(initialState, {
      type: FETCH_MY_ACTIVITIES_REQUEST,
      requesting: true,
    })).toEqual({
      requesting: true,
      failed: false,
      activities: [],
    });
  });

  it('should handle FETCH_MY_ACTIVITIES_FAILURE', () => {
    expect(myActivitiesReducer(initialState, {
      type: FETCH_MY_ACTIVITIES_FAILURE,
      failed: true,
    })).toEqual({
      requesting: false,
      failed: true,
      activities: [],
    });
  });

  it('should handle FETCH_MY_ACTIVITIES_SUCCESS', () => {
    expect(myActivitiesReducer(initialState, {
      type: FETCH_MY_ACTIVITIES_SUCCESS,
      activities,
    })).toEqual({
      requesting: false,
      failed: false,
      activities,
    });
  });
});
