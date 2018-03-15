import jwtDecode from 'jwt-decode';

/**
 * @name getToken
 * @summary Retrieves token from cookie
 * @return {string} representing token
 */
export const getToken = () => {
  const cookie = document.cookie.split('jwt-token=');
  if (cookie.length > 1) {
    return cookie[1];
  }
  return null;
};

/**
 * @name getsignInError
 * @summary Reads signin error from url and adds it to localStorage
 */
export const getsignInError = () => {
  const params = (new URL(document.location)).searchParams;
  const signInError = params.get('error');
  if (signInError) {
    localStorage.setItem('signInError', signInError);
  }
};

/**
 * @name tokenIsValid
 * @summary Checks that token has not expired and payload has Andelan role
 * @return {boolean} representing token
 */
export const tokenIsValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (decoded.exp > new Date().getTime() / 1000 && decoded.UserInfo.roles.Andelan.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

/**
 * @name isFellow
 * @summary Checks that token payload has Fellow role
 * @return {boolean} representing token
 */
export const isFellow = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (decoded.UserInfo.roles.Fellow.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
