import { takeEvery, call, put } from 'redux-saga/effects';

import types from './types';
import actions from './actions';
import { get } from '../../utils/api';

export function* fetchUserRole(action) {
  const { userId } = action.payload;
  try {
    const result = yield call(get, `users/${userId}`);
    const { roles } = result.data;
    yield put(actions.fetchUserRoleSuccess(roles));
  } catch (error) {
    yield put(actions.fetchUserRoleError('Unable to get you role. Some features may not be visible'));
  }
}

function* watchFetchUserRoleRequest() {
  yield takeEvery(types.FETCH_USER_ROLE_REQUEST, fetchUserRole);
}

export default watchFetchUserRoleRequest;
