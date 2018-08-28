import capitalizeString from '../../src/helpers/stringFormatter';

describe('dateFormatter', () => {
  it('should return correct date format', () => {
    expect(capitalizeString('hello')).toBe('Hello');
  });
});
