import myActivitiesReducer from '../../src/reducers/myActivitiesReducer';
import {
  FETCH_MY_ACTIVITIES_REQUEST,
  FETCH_MY_ACTIVITIES_SUCCESS,
  FETCH_MY_ACTIVITIES_FAILURE,
  CREATE_ACTIVITY_REQUEST,
  CREATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_FAILURE,
} from '../../src/types';
import activities from '../../src/fixtures/activities';
import activity from '../../src/fixtures/activity';
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
      activities: [],
      message: null,
      error: null,
    });
  });

  it('should handle FETCH_MY_ACTIVITIES_FAILURE', () => {
    const error = new Error('Request failed with status code 401');
    expect(myActivitiesReducer(initialState, {
      type: FETCH_MY_ACTIVITIES_FAILURE,
      error,
    })).toEqual({
      requesting: false,
      activities: [],
      message: null,
      error,
    });
  });

  it('should handle FETCH_MY_ACTIVITIES_SUCCESS', () => {
    expect(myActivitiesReducer(initialState, {
      type: FETCH_MY_ACTIVITIES_SUCCESS,
      activities,
    })).toEqual({
      requesting: false,
      error: null,
      message: null,
      activities,
    });
  });

  // create activities actions
  it('should handle CREATE_ACTIVITY_REQUEST', () => {
    expect(myActivitiesReducer(initialState, {
      type: CREATE_ACTIVITY_REQUEST,
    })).toEqual({
      requesting: false,
      activities: [],
      error: null,
      message: {
        type: 'info',
        text: 'Sending ...',
      },
    });
  });

  it('should handle CREATE_ACTIVITY_FAILURE', () => {
    const error = new Error('Request failed with status code 401');
    expect(myActivitiesReducer(initialState, {
      type: CREATE_ACTIVITY_FAILURE,
      error,
    })).toEqual({
      requesting: false,
      activities: [],
      message: {
        text: 'An error has occurred',
        type: 'error',
      },
      error,
    });
  });

  it('should handle CREATE_ACTIVITY_SUCCESS', () => {
    expect(myActivitiesReducer(initialState, {
      type: CREATE_ACTIVITY_SUCCESS,
      activity,
    })).toEqual({
      requesting: false,
      error: null,
      message: {
        type: 'success',
        text: 'Activity Logged Successfully',
      },
      activities: [activity],
    });
  });
});
