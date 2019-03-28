import actions from '../actions';
import types from '../types';

describe('Sidebar actions', () => {
  describe('fetch user role request', () => {
    it('has a type of FETCH_USER_ROLE_REQUEST', () => {
      const userId = 1;
      const expected = {
        type: types.FETCH_USER_ROLE_REQUEST,
        payload: { userId }
      };
      expect(actions.fetchUserRoleRequest(userId)).toEqual(expected);
    });
  });

  describe('fetch user role error', () => {
    it('has a type of FETCH_USER_ROLE_ERROR', () => {
      const errorMsg = 'No projects';
      const expected = {
        type: types.FETCH_USER_ROLE_ERROR,
        payload: { error: errorMsg },
      };
      expect(actions.fetchUserRoleError(errorMsg)).toEqual(expected);
    });
  });

  describe('fetch user role success', () => {
    it('has a type of FETCH_USER_ACTIVITIES_SUCCESS', () => {
      const role = {
        'society secretary': 'cio12345'
      };
      const expected = {
        type: types.FETCH_USER_ROLE_SUCCESS,
        payload: { role },
      };
      expect(actions.fetchUserRoleSuccess(role)).toEqual(expected);
    });
  });
});
