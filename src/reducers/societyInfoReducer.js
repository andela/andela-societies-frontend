import {
  FETCH_SOCIETY_INFO_REQUEST,
  FETCH_SOCIETY_INFO_SUCCESS,
  FETCH_SOCIETY_INFO_FAILURE,
} from '../types';
import initialState from './initialState';

/**
 * @function societyInfo
 * societyInfo reducer
 *
 * @param {Object} state societyInfo initial state
 * @param {Object} action
 * @returns {Object} societyInfo state
 */
const societyInfo = (state = initialState.societyInfo, action) => {
  switch (action.type) {
  case FETCH_SOCIETY_INFO_REQUEST:
    return { ...state, requesting: true };
  case FETCH_SOCIETY_INFO_FAILURE:
    return { ...state, requesting: false, error: action.error };
  case FETCH_SOCIETY_INFO_SUCCESS:
    return { ...state, requesting: false, info: { ...state.info, ...action.info } };
  default:
    return state;
  }
};

export default societyInfo;
