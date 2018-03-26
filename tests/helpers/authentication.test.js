import { tokenIsValid, isFellow } from '../../src/helpers/authentication';
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
});
