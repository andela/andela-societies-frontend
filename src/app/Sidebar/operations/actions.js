import types from './types';

const fetchUserRoleRequest = userId => ({
  type: types.FETCH_USER_ROLE_REQUEST,
  payload: { userId },
});

const fetchUserRoleSuccess = role => ({
  type: types.FETCH_USER_ROLE_SUCCESS,
  payload: { role },
});

const fetchUserRoleError = error => ({
  type: types.FETCH_USER_ROLE_ERROR,
  payload: { error },
});

export default {
  fetchUserRoleError,
  fetchUserRoleRequest,
  fetchUserRoleSuccess,
};
