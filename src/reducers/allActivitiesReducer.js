import {
  FETCH_ALL_ACTIVITIES_FAILURE,
  FETCH_ALL_ACTIVITIES_REQUEST,
  FETCH_ALL_ACTIVITIES_SUCCESS,
  VERIFY_ACTIVITY_SUCCESS,
  VERIFY_ACTIVITY_FAILURE,
  VERIFY_ACTIVITY_REQUEST,
  VERIFY_ACTIVITY_OPS_SUCCESS,
  VERIFY_ACTIVITY_OPS_FAILURE,
  VERIFY_ACTIVITY_OPS_REQUEST,
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
  case VERIFY_ACTIVITY_OPS_REQUEST:
    return { ...state, updating: true };
  case VERIFY_ACTIVITY_OPS_SUCCESS:
  {
    const activities = state.activities.map((element) => {
      const el = element;
      if (action.activityIds.includes(element.id)) {
        el.status = 'approved';
      }
      return el;
    });
    return { ...state, updating: false, activities };
  }
  case VERIFY_ACTIVITY_OPS_FAILURE:
    return {
      ...state,
      updating: false,
      error: action.error,
      message: {
        type: 'error',
        text: action.error.response
          ?
          action.error.response.data.message
          :
          'An error has occurred while processing your request',
      },
    };
  default:
    return state;
  }
};

export default allActivities;
