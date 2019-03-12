import pointsToDollarConverter from '../pointsToDollarConverter';

describe('PointsToDollarConverter util', () => {
  it('returns dollar value for points provided', () => {
    expect(pointsToDollarConverter(5000)).toEqual("100.00");
  });
});
