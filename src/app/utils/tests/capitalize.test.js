import capitalize from '../capitalize';

describe('Capitalize util', () => {
  it('returns capitalized string', () => {
    expect(capitalize('dashboard')).toEqual('Dashboard');
  });
});
