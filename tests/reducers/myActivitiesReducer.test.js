import myActivitiesReducer from '../../src/reducers/myActivitiesReducer';
import { updateActivitiesRequestSuccess } from '../../src/actions/myActivitiesActions';
import {
  FETCH_MY_ACTIVITIES_REQUEST,
  FETCH_MY_ACTIVITIES_SUCCESS,
  FETCH_MY_ACTIVITIES_FAILURE,
  CREATE_ACTIVITY_REQUEST,
  CREATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_FAILURE,
  UPDATE_MY_ACTIVITIES,
  UPDATE_MY_ACTIVITIES_FAILURE,
} from '../../src/types';
import activities from '../../src/fixtures/activities';
import activity from '../../src/fixtures/activity';
import initialState from '../../src/reducers/initialState';

const defaultState = initialState.myActivities;

describe('myActivitiesReducer', () => {
  it('should return the initial state when the action is not handled', () => {
    expect(myActivitiesReducer(defaultState, { type: 'DOES_NOT_EXIST' })).toEqual(defaultState);
  });

  it('should handle FETCH_MY_ACTIVITIES_REQUEST', () => {
    expect(myActivitiesReducer(defaultState, {
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
    expect(myActivitiesReducer(defaultState, {
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
    expect(myActivitiesReducer(defaultState, {
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
    expect(myActivitiesReducer(defaultState, {
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
    expect(myActivitiesReducer(defaultState, {
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
    expect(myActivitiesReducer(defaultState, {
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

  // update activities actions
  it('should handle UPDATE_MY_ACTIVITIES', () => {
    expect(myActivitiesReducer(defaultState, {
      type: UPDATE_MY_ACTIVITIES,
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

  it('should handle UPDATE_MY_ACTIVITIES_FAILURE', () => {
    expect(myActivitiesReducer(defaultState, {
      type: UPDATE_MY_ACTIVITIES_FAILURE,
      error: 'No content found',
    })).toEqual({
      requesting: false,
      activities: [],
      error: 'No content found',
      message: {
        text: 'An error has occurred',
        type: 'error',
      },
    });
  });

  it('should update an acitivity successfully ', () => {
    const initial = { ...defaultState, activities: [activity] };
    const updatedActivity = {
      ...activity,
      description: 'Dummy updated data activity description',
      message: 'Activity updated successfully',
    };
    const updateActivitySuccessAction = updateActivitiesRequestSuccess(updatedActivity);
    const newActivity = initial.activities.map((r) => {
      if (r.id === activity.id) {
        return updatedActivity;
      }
      return r;
    });
    const expectedOutput = {
      ...initial,
      message: {
        type: 'success',
        text: 'Activity Updated Successfully',
      },
      activities: newActivity,
      requesting: false,
    };
    expect(myActivitiesReducer(initial, updateActivitySuccessAction)).toEqual(expectedOutput);
  });

  it('should return initial activity if activity id cannot be found', () => {
    const initial = { ...defaultState, activities: [activity] };
    const updatedActivity = {
      id: '10',
      description: 'qwerty qwwtyu lorem ipsum',
      message: 'Activity updated successfully',
    };
    const updateActivitySuccessAction = updateActivitiesRequestSuccess(updatedActivity);
    const checkForActivityDifferenceResult = initial.activities.map((r) => {
      if (r.id === updatedActivity.id) {
        return activity;
      }
      return r;
    });
    const expectedOutput = {
      ...initial,
      message: {
        type: 'success',
        text: 'Activity Updated Successfully',
      },
      activities: checkForActivityDifferenceResult,
      requesting: false,
    };
    expect(myActivitiesReducer(initial, updateActivitySuccessAction)).toEqual(expectedOutput);
  });
});
