import tokenIsValid from '../tokenIsValid';

describe('TokenIsValid util', () => {
  it('returns false when there is no token', () => {
    expect(tokenIsValid()).toBe(false);
  });
})