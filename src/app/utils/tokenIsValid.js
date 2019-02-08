import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';

/**
 * @name getToken
 * @summary Retrieves token
 * @return {object} representing token information
 */
export const getToken = () => {
  try {
    const token = Cookie.get('jwt-token');
    if (!token) return false;
    return jwtDecode(token);
  } catch (error) {
    return {};
  }
};

/**
 * @name tokenIsValid
 * @summary Checks that token has not expired and payload has Andelan role
 * @return {boolean} representing token
 */
export const tokenIsValid = () => {
  const token = getToken();
  if (token.exp > new Date().getTime() / 1000 && token.UserInfo.roles.Andelan.length > 0) {
    return true;
  }
  return false;
};

/**
 * @name getUserInfo
 * @summary Retrieves user information
 * @return {object} representing user information
 */
export const getUserInfo = () => {
  const userDetails = getToken();
  return userDetails.UserInfo || {};
};
