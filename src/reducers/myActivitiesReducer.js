import {
  FETCH_MY_ACTIVITIES_REQUEST,
  FETCH_MY_ACTIVITIES_SUCCESS,
  FETCH_MY_ACTIVITIES_FAILURE,
  CREATE_ACTIVITY_REQUEST,
  CREATE_ACTIVITY_SUCCESS,
  CREATE_ACTIVITY_FAILURE,
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
  case FETCH_MY_ACTIVITIES_REQUEST:
    return { ...state, requesting: true };
  case FETCH_MY_ACTIVITIES_FAILURE:
    return {
      ...state,
      error: action.error,
      requesting: false,
    };
  case FETCH_MY_ACTIVITIES_SUCCESS:
    return {
      ...state,
      activities: action.activities,
      requesting: false,
    };
  case CREATE_ACTIVITY_REQUEST:
    return {
      ...state,
      message: {
        type: 'info',
        text: 'Sending ...',
      },
    };
  case CREATE_ACTIVITY_SUCCESS:
    return {
      ...state,
      activities: [action.activity].concat(state.activities),
      message: {
        type: 'success',
        text: 'Activity Logged Successfully',
      },
    };
  case CREATE_ACTIVITY_FAILURE:
    return {
      ...state,
      error: action.error,
      message: {
        type: 'error',
        text: action.error.response ? action.error.response.data.message : 'An error has occurred',
      },
    };
  default:
    return state;
  }
};

export default myActivities;
