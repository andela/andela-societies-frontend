import { FETCH_USER_INFO } from '../types';
import initialState from './initialState';

/**
 * @param {object} state
 * @param {object} action
 * @returns {object} state
 */
const userInfo = (state = initialState.userInfo, action) => {
  switch (action.type) {
  case FETCH_USER_INFO: {
    return { ...state, ...action.tokenInfo.UserInfo };
  }
  default: {
    return state;
  }
  }
};

export default userInfo;
