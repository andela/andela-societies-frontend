// reducer
import combineReducer from '../../src/reducers';

describe('Combined reducer', () => {
  it('should contain all reducers in one place', () => {
    expect(combineReducer).toBeTruthy();
  });
});

