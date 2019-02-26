import Cookies from 'js-cookie';
import { validToken, invalidToken } from './fixtures';
import {
  tokenIsValid, getUserInfo, getToken, removeCookies,
} from '../tokenIsValid';

describe('TokenIsValid util', () => {
  it('returns empty object when there is an invalid token in cookie', () => {
    Cookies.set('jwt-token', 'dsnkjsdaslsl');
    expect(getToken()).toEqual({});
  });

  it('returns false when there is not valid', () => {
    expect(tokenIsValid(invalidToken)).toBe(false);
  });

  it('returns true when token is valid', () => {
    expect(tokenIsValid(validToken)).toBe(true);
  });

  it('returns a user information ', () => {
    expect(getUserInfo(validToken)).toEqual(validToken.UserInfo);
  });

  it('removes the stored token from cookies', () => {
    removeCookies('jwt-token', {});
    expect(getToken()).toBe(false);
  });
});
