import actions from '../actions';
import types from '../types';

describe('Navbar actions', () => {
  describe('page loading', () => {
    it('has type SEARCH', () => {
      const searchQuery = 'search test';
      const expected = {
        type: types.SEARCH,
        payload: { query: searchQuery }
      };
      expect(actions.search(searchQuery)).toEqual(expected);
    });
  });
});
