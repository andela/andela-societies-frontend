import dateFormatter from '../../src/helpers/dateFormatter';

describe('dateFormatter', () => {
  it('should return correct date format', () => {
    expect(dateFormatter('2018-05-10')).toBe('May 10, 2018');
  });
});
