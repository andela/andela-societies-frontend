import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import types from './types';
import actions from './actions';
import { get } from '../../utils/api';

export function* watchFetchUserActivitiesRequest() {
  yield takeLatest(types.FETCH_USER_ACTIVITIES_REQUEST, fetchUserActivities);
}

function* fetchUserActivities (action) {
  try {
    const result = yield call(get, `users/${action.userId}/logged-activities`);
    yield put(actions.fetchUserActivitiesSuccess(result.data, result.pointsEarned, result.activitiesLogged));
  } catch (error) {
    yield put(actions.fetchUserActivitiesError(error));
  }
}
