import Cookies from 'js-cookie';

import { token, userInfo } from './fixtures';
import { tokenIsValid, getUserInfo } from '../tokenIsValid';

describe('TokenIsValid util', () => {
  it('returns false when there is no token', () => {
    expect(tokenIsValid()).toBe(false);
  });
  
  it('returns true when there is a token', () => {
    Cookies.set('jwt-token', token);
    expect(tokenIsValid()).toBe(true);
  });
  it('returns false when an invalid token is provided', () => {
    Cookies.set('jwt-token', 'token');
    expect(tokenIsValid()).toBe(false);
  });

  describe('Get user info util', () => {
    it('returns a user information ', () => {
      Cookies.set('jwt-token', token);
      expect(getUserInfo()).toEqual(userInfo);
    });
  })
})
