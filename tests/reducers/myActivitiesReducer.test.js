import myActivitiesReducer from '../../src/reducers/myActivitiesReducer';
import {
  MY_ACTIVITIES_GET_REQUEST,
  MY_ACTIVITIES_GET_SUCCESS,
  MY_ACTIVITIES_GET_FAILURE,
} from '../../src/types';
import activities from '../../src/fixtures/activities';
import store from '../../src/fixtures/store';

describe('myActivitiesReducer', () => {
  const initialState = store.myActivities;

  it('should return the initial state when the action is not handled', () => {
    expect(myActivitiesReducer(initialState, { type: 'DOES_NOT_EXIST' })).toEqual(initialState);
  });

  it('should handle MY_ACTIVITIES_GET_REQUEST', () => {
    expect(myActivitiesReducer(initialState, {
      type: MY_ACTIVITIES_GET_REQUEST,
      requesting: true,
    })).toEqual({
      requesting: true,
      failed: false,
      activities: [],
    });
  });

  it('should handle MY_ACTIVITIES_GET_FAILURE', () => {
    expect(myActivitiesReducer(initialState, {
      type: MY_ACTIVITIES_GET_FAILURE,
      failed: true,
    })).toEqual({
      requesting: false,
      failed: true,
      activities: [],
    });
  });

  it('should handle MY_ACTIVITIES_GET_SUCCESS', () => {
    expect(myActivitiesReducer(initialState, {
      type: MY_ACTIVITIES_GET_SUCCESS,
      activities,
    })).toEqual({
      requesting: false,
      failed: false,
      activities,
    });
  });
});
