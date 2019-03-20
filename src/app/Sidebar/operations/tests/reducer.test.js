import types from '../types';
import sidebar from '../reducer';
import initialState from '../../../../reducers/initialState';

const defaultState = initialState.sidebar;

describe('Sidebar reducer', () => {
  describe('handles case no action', () => {
    it('returns the initial state', () => {
      expect(sidebar(defaultState, { type: 'DOES_NOT_EXIST' })).toEqual(defaultState);
    });
  });

  describe('handles case FETCH_USER_ROLE_ERROR', () => {
    it('returns error', () => {
      const error = 'There was an error';
      expect(
        sidebar(defaultState, {
          type: types.FETCH_USER_ROLE_ERROR,
          payload: { error },
        }),
      ).toEqual({
        ...defaultState,
        error,
      });
    });
  });

  describe('handles case FETCH_USER_ROLE_SUCCESS', () => {
    const role = {
      'society secretary': 'cio12345'
    };
    it('returns user role', () => {
      expect(sidebar(defaultState, {
        type: types.FETCH_USER_ROLE_SUCCESS,
        payload: { role }
      })).toEqual({
       ...defaultState,
       userRole: role
      });
    });
  });
});
