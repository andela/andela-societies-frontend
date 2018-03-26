import { FETCH_USER_INFO } from './constants';

/**
 * @export
 * @param {object} tokenInfo
 * @returns {object} FETCH_USER_INFO action
 */
/* eslint-disable import/prefer-default-export */
export const fetchUserInfo = tokenInfo => ({
  type: FETCH_USER_INFO,
  tokenInfo,
});
/* eslint-enable import/prefer-default-export */
