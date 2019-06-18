import {
  call, put, takeEvery,
} from 'redux-saga/effects';
import types from './types';
import actions from './actions';
import {
  edit,
} from '../../utils';

export function* approveActivity(action) {
  const { id, societyName } = action.payload;
  yield put(actions.approveActivityPageLoading());
  try {
    const response = yield call(edit, 'logged-activities/approve', { loggedActivitiesIds: [id] });
    const { message, data } = response;
    yield put(actions.approveActivitySuccess(id, message, societyName, data));
  } catch (error) {
    yield put(actions.approveActivityPageError('There was an error completing the requested action'));
  }
}

export function* watchApproveActivityRequest() {
  yield takeEvery(types.APPROVE_ACTIVITY_REQUEST, approveActivity);
}

// Reject activity
export function* rejectActivity(action) {
  const { id, status } = action.payload;
  yield put(actions.rejectActivityPageLoading());
  try {
    const response = yield call(edit, `logged-activities/review/${id}`, { status });
    const { message, data: { society: { name } }, data } = response;
    yield put(actions.rejectActivitySuccess(id, message, name, data));
  } catch (error) {
    yield put(actions.rejectActivityPageError('There was an error completing the requested action'));
  }
}

export function* watchRejectActivityRequest() {
  yield takeEvery(types.REJECT_ACTIVITY_REQUEST, rejectActivity);
}
