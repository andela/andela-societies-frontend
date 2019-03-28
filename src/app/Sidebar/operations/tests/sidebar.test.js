import { takeEvery, call, put } from 'redux-saga/effects';

import types from '../types';
import actions from '../actions';
import { get } from '../../../utils/api';
import watchFetchUserRoleRequest, { fetchUserRole } from '../sidebar.data';

describe('Dashboard saga', () => {
  let generator;
  describe('watchFetchUserRoleRequest generator', () => {
    it('takes FETCH_USER_ROLE_REQUEST action', () => {
      generator = watchFetchUserRoleRequest();
      expect(generator.next().value).toEqual(takeEvery(types.FETCH_USER_ROLE_REQUEST, fetchUserRole));
    });
  });

  describe('fetchUserRole generator', () => {
    const userId = 1;
    const action = {
      type: types.FETCH_USER_ACTIVITIES_SUCCESS,
      payload: { userId },
    };

    it('puts fetchUserRoleError', () => {
      generator = fetchUserRole(action);
      expect(generator.next().value).toEqual(call(get, `users/${userId}`));
      expect(generator.throw().value).toEqual(
        put(actions.fetchUserRoleError('Unable to get you role. Some features may not be visible')),
      );
    });

    it('puts fetchUserRoleSuccess', () => {
      const roles = {
        'society secretary': 'cio12345',
      };
      generator = fetchUserRole(action);
      const expectedApiResult = {
        data: {
          roles,
        },
      };
      expect(generator.next().value).toEqual(call(get, `users/${userId}`));
      expect(generator.next(expectedApiResult).value).toEqual(
        put(actions.fetchUserRoleSuccess(roles)),
      );
    });
  });
});
