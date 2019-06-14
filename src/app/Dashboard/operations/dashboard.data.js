import {
  call, put, takeLatest, delay,
} from 'redux-saga/effects';
import types from './types';
import actions from './actions';
import { get } from '../../utils/api';

export function* fetchUserActivities(action) {
  try {
    const result = yield call(get, `users/${action.userId}/logged-activities`);
    yield put(
      actions.fetchUserActivitiesSuccess(
        result.data,
        result.pointsEarned,
        result.activitiesLogged,
        result.society,
        result.level.name,
      ),
    );
  } catch (error) {
    yield put(actions.fetchUserActivitiesError(error));
  }
}

export function* logActivitySuccess() {
  try {
    yield put({ type: types.LOG_ACTIVITY_TOAST_OPEN });
    yield delay(2000);
    yield put({ type: types.LOG_ACTIVITY_TOAST_CLOSE });
  } catch (error) {
    yield put(actions.logPointsFail(error.toString()));
  }
}

function* watchFetchUserActivitiesRequest() {
  yield takeLatest(types.FETCH_USER_ACTIVITIES_REQUEST, fetchUserActivities);
}

export function* watchLogActivitySuccess() {
  yield takeLatest(types.LOG_POINTS_SUCCESS, logActivitySuccess);
}

export default watchFetchUserActivitiesRequest;
