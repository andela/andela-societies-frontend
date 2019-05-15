import {
  call, put, takeEvery, takeLatest, delay,
} from 'redux-saga/effects';
import types from './types';
import actions from './actions';
import {
  get, post, edit, pointsToDollarConverter, capitalize,
} from '../../utils';

export function* fetchSocietyInfo(action) {
  const { societyName } = action.payload;
  yield put(actions.societyPageLoading());
  try {
    const result = yield call(get, `societies?name=${societyName}`);
    const {
      totalPoints, usedPoints, remainingPoints, loggedActivities,
    } = result.societyDetails;
    const activitiesLogged = loggedActivities.length;
    yield put(
      actions.fetchSocietyInfoSuccess(
        societyName,
        totalPoints,
        usedPoints,
        remainingPoints,
        loggedActivities,
        activitiesLogged,
      ),
    );
  } catch (error) {
    yield put(actions.societyPageError('There was an error fetching activities. Try again later'));
  }
}

function* watchFetchSocietyInfoReq() {
  yield takeEvery(types.FETCH_SOCIETY_INFO_REQUEST, fetchSocietyInfo);
}

export function* verifyActivitySecretary(action) {
  try {
    const result = yield call(edit, `logged-activities/review/${action.loggedActivityId}`, action.activityStatus);
    yield put(actions.verifyActivitySuccess(result));
  } catch (error) {
    yield put(actions.verifyActivityFail(error.toString()));
  }
}

export function* watchVerifyActivitySecretary() {
  yield takeLatest(types.VERIFY_ACTIVITY_REQUEST, verifyActivitySecretary);
}

export function* fetchSocietyRedemptions(action) {
  const { societyName } = action.payload;
  yield put(actions.societyPageLoading());
  try {
    const result = yield call(get, `societies/redeem?society=${societyName}`);
    yield put(actions.fetchSocietyRedemptionsSuccess(result.data, societyName));
  } catch (error) {
    yield put(actions.societyPageError('There was an error fetching redemptions. Try again later'));
  }
}

export function* watchFetchSocietyRedemptionsReq() {
  yield takeEvery(types.FETCH_SOCIETY_REDEMPTIONS_REQUEST, fetchSocietyRedemptions);
}

export function* createRedemption(action) {
  const { data, societyName } = action.payload;
  yield put(actions.societyPageLoading());
  try {
    const result = yield call(post, '/societies/redeem', data);
    yield put(actions.createRedemptionSuccess(result.data, societyName));
  } catch (error) {
    yield put(actions.societyPageError('There was an error creating your redemption'));
  }
}

export function* watchCreateRedemptionReq() {
  yield takeEvery(types.CREATE_REDEMPTION_REQUEST, createRedemption);
}

export function* verifyActivitySuccess() {
  try {
    yield put({ type: types.VERIFY_ALERT_OPEN });
    yield delay(2000);
    yield put({ type: types.VERIFY_ALERT_CLOSE });
  } catch (error) {
    yield put(actions.verifyActivityFail(error.toString()));
  }
}

export function* watchVerifyActivitySuccess() {
  yield takeLatest(types.VERIFY_ACTIVITY_SUCCESS, verifyActivitySuccess);
}

export function* approveBudget(action) {
  const {
    id, status, societyName,
  } = action.payload;
  yield put(actions.approveBudgetPageLoading());
  try {
    const response = yield call(edit, `societies/redeem/verify/${id}`, { status });
    const message = `USD ${pointsToDollarConverter(response.data.value)} ${capitalize(status)}`;
    yield put(actions.approveBudgetSuccess(response.data, societyName, status, message));
  } catch (error) {
    yield put(actions.approveBudgetPageError(`There was an error completing the ${status} action`));
  }
}

export function* watchApproveBudgetRequest() {
  yield takeEvery(types.APPROVE_BUDGET_REQUEST, approveBudget);
}

export default watchFetchSocietyInfoReq;
