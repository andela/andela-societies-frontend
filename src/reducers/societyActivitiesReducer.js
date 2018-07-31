import {
  FETCH_SOCIETY_INFO_REQUEST,
  FETCH_SOCIETY_INFO_SUCCESS,
  FETCH_SOCIETY_INFO_FAILURE,
} from '../types';
import initialState from './initialState';

/**
 * @function societyActivities
 * societyActivities reducer for society pages
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
  default:
    return state;
  }
};

export default societyActivities;
