import {
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
} from '../types';
import initialState from './initialState';

/**
 * @function userProfile
 * userProfile reducer
 *
 * @param {Object} state user profile initial state
 * @param {Object} action
 * @returns {Object} user profile state
 */
const userProfile = (state = initialState.userProfile, action) => {
  switch (action.type) {
  case FETCH_USER_PROFILE_REQUEST:
    return {
      ...state,
      requesting: true,
    };
  case FETCH_USER_PROFILE_FAILURE:
    return {
      ...state,
      requesting: false,
      error: action.error,
    };
  case FETCH_USER_PROFILE_SUCCESS:
    return {
      ...state,
      requesting: false,
      info: { ...state.info, ...action.profile },
    };
  default:
    return state;
  }
};

export default userProfile;
