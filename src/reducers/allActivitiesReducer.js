import {
  FETCH_ALL_ACTIVITIES_FAILURE,
  FETCH_ALL_ACTIVITIES_REQUEST,
  FETCH_ALL_ACTIVITIES_SUCCESS,
} from '../types';
import initialState from './initialState';

/**
 * @function societyInfo
 * societyInfo reducer
 *
 * @param {Object} state allActivities initial state
 * @param {Object} action
 * @returns {Object} societyInfo state
 */
const allActivities = (state = initialState.allActivities, action) => {
  switch (action.type) {
  case FETCH_ALL_ACTIVITIES_REQUEST:
    return { ...state, requesting: true };
  case FETCH_ALL_ACTIVITIES_FAILURE:
    return { ...state, requesting: false, error: action.error };
  case FETCH_ALL_ACTIVITIES_SUCCESS:
    return { ...state, requesting: false, activities: action.activities };
  default:
    return state;
  }
};

export default allActivities;
