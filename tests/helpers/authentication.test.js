import Cookies from 'js-cookie';
import { tokenIsValid, isFellow, getToken, removeCookies } from '../../src/helpers/authentication';
import { fellowTokenInfo, nonFellowTokenInfo } from '../__mocks__/tokenInfoMock';

describe('Authentication Helpers', () => {
  it('should validate token', () => {
    expect(tokenIsValid(fellowTokenInfo)).toBe(true);
  });
  it('should set expired token to invalid', () => {
    fellowTokenInfo.exp = 0;
    expect(tokenIsValid(fellowTokenInfo)).toBe(false);
  });
  it('should verify fellow role', () => {
    expect(isFellow(fellowTokenInfo)).toBe(true);
  });
  it('should not verify non-fellow role', () => {
    expect(isFellow(nonFellowTokenInfo)).toBe(false);
  });
  it('should fetch the stored token from cookies', () => {
    const token = 'ysdfhdfui24rwe89u4h2eqoiu1329i';
    Cookies.set('jwt-token', token);
    expect(getToken()).toEqual(token);
  });
  it('should remove the stored token from cookies', () => {
    removeCookies('jwt-token', {});
    expect(getToken()).toBeNull();
  });
});
