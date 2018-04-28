import {
  MY_ACTIVITIES_GET_REQUEST,
  MY_ACTIVITIES_GET_SUCCESS,
  MY_ACTIVITIES_GET_FAILURE,
} from '../types';
import initialState from './initialState';

/**
 * myActivities reducer
 *
 * @param {Object} state myActivities initial state
 * @param {Object} action
 * @returns {Object} myActivities state
 */
const myActivities = (state = initialState.myActivities, action) => {
  switch (action.type) {
  case MY_ACTIVITIES_GET_REQUEST:
    return { ...state, requesting: action.requesting };
  case MY_ACTIVITIES_GET_FAILURE:
    return { ...state, failed: action.failed };
  case MY_ACTIVITIES_GET_SUCCESS:
    return { ...state, activities: action.activities };
  default:
    return state;
  }
};

export default myActivities;
