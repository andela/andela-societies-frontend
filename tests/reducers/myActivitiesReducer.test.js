import myActivitiesReducer from '../../src/reducers/myActivitiesReducer';
import {
  MY_ACTIVITIES_GET_REQUEST,
  MY_ACTIVITIES_GET_SUCCESS,
  MY_ACTIVITIES_GET_FAILURE,
} from '../../src/actions/constants';
import activities from '../../src/fixtures/activities';

describe('myActivitiesReducer', () => {
  const initialState = {
    requesting: false,
    failed: false,
    activities: [],
  };

  it('should return the initial state', () => {
    expect(myActivitiesReducer(undefined, {})).toEqual({
      requesting: false,
      failed: false,
      activities: [],
    });
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

  it('should handle MY_ACTIVITIES_GET_REQUEST', () => {
    expect(myActivitiesReducer(initialState, {
      type: MY_ACTIVITIES_GET_FAILURE,
      failed: true,
    })).toEqual({
      requesting: false,
      failed: true,
      activities: [],
    });
  });

  it('should handle MY_ACTIVITIES_GET_REQUEST', () => {
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