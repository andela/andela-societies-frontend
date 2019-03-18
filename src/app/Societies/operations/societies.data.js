import { call, put, takeEvery } from 'redux-saga/effects';
import types from './types';
import actions from './actions';
import { get } from '../../utils/api';

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
      actions.fetchSocietyInfoSuccess(totalPoints, usedPoints, remainingPoints, loggedActivities, activitiesLogged),
    );
  } catch (error) {
    yield put(actions.societyPageError());
  }
}

function* watchFetchSocietyInfoReq() {
  yield takeEvery(types.FETCH_SOCIETY_INFO_REQUEST, fetchSocietyInfo);
}

export default watchFetchSocietyInfoReq;
