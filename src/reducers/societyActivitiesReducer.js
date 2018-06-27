import {
  FETCH_SOCIETY_INFO_REQUEST,
  FETCH_SOCIETY_INFO_SUCCESS,
  FETCH_SOCIETY_INFO_FAILURE,
  VERIFY_ACTIVITY_SUCCESS,
  VERIFY_ACTIVITY_FAILURE,
  VERIFY_ACTIVITY_REQUEST,
} from '../types';
import initialState from './initialState';

/**
 * @function societyActivities
 * societyActivities reducer
 *
 * @param {Object} state societyActivities initial state
 * @param {Object} action
 * @returns {Object} societyActivities state
 */
const societyActivities = (state = initialState.societyActivities, action) => {
  switch (action.type) {
  case FETCH_SOCIETY_INFO_REQUEST:
    return { ...state, requesting: true };
  case FETCH_SOCIETY_INFO_FAILURE:
    return { ...state, requesting: false, error: action.error };
  case FETCH_SOCIETY_INFO_SUCCESS:
    return { ...state, requesting: false, activities: action.info.loggedActivities };
  case VERIFY_ACTIVITY_REQUEST:
    return { ...state, updating: true };
  case VERIFY_ACTIVITY_FAILURE:
    return { ...state, updating: false, error: action.error };
  case VERIFY_ACTIVITY_SUCCESS: {
    const activities = state.activities.map(activity => (
      activity.id !== action.activity.id ? activity : action.activity
    ));
    return { ...state, updating: false, activities };
  }
  default:
    return state;
  }
};

export default societyActivities;
