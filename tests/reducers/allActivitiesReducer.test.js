// initial state
import initialState from '../../src/reducers/initialState';

// actions
import {
  fetchAllActivitiesFailure,
  fetchAllActivitiesRequests,
  fetchAllActivitiesSuccess,
} from '../../src/actions/allActivitiesActions';

// reducer
import allActivities from '../../src/reducers/allActivitiesReducer';

// fixtures
import activities from '../../src/fixtures/activities';

const defaultState = initialState.allActivities;
let expectedOutput;

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
    const error = new Error('Request failed with status code 400');
    expectedOutput = {
      ...defaultState,
      requesting: false,
      error,
    };
    expect(allActivities(defaultState, fetchAllActivitiesFailure(error))).toEqual(expectedOutput);
  });
});
