import types from '../types';
import navbar from '../reducer';
import initialState from '../../../../reducers/initialState';

const defaultState = initialState.navbar;

describe('Navbar reducer', () => {
  describe('case default', () => {
    it('returns the initial state', () => {
      expect(navbar(defaultState, { type: 'DOES_NOT_EXIST' })).toEqual(defaultState);
    });
  });

  describe('case SEARCH', () => {
    it('add search query to state', () => {
      const searchQuery= 'search test';
      const action = {
        type: types.SEARCH,
        payload: { query: searchQuery }
      };
      expect(navbar(defaultState, action)).toEqual({ ...defaultState, searchText: searchQuery });
    });
  });
});
