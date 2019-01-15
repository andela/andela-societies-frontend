import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';

/**
 * @name tokenIsValid
 * @summary Checks that token has not expired and payload has Andelan role
 * @return {boolean} representing token
 */
const tokenIsValid = () => {
  try {
    let token = Cookie.get('jwt-token');
    if (!token) return false;
    token = jwtDecode(token);
    if (token.exp > new Date().getTime() / 1000 && token.UserInfo.roles.Andelan.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export default tokenIsValid;
