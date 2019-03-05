import { put, takeEvery, call } from 'redux-saga/effects';

import actions from './actions';
import types from './types';
import { get, post } from '../../utils/api';

export function* handleCategoriesLoad() {
  try {
    const categories = yield call(get, 'activity-types');
    yield put(actions.setCategories(categories));
  } catch (error) {
    yield put(actions.setError(error.toString()));
  }
}

export function* addNewActivity(action) {
  try {
    const result = yield call(post, 'logged-activities', action.activity);
    yield put(actions.logPointsSuccess(result));
  } catch (error) {
    yield put(actions.setError(error.toString()));
  }
}

export function* watchLogActivityPoints() {
  yield takeEvery(types.LOG_POINTS.POST_REQUEST, addNewActivity);
}

export function* watchCategoriesLoad() {
  yield takeEvery(types.CATEGORIES.LOAD, handleCategoriesLoad);
}
