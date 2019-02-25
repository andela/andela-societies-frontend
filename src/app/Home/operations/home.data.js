/* eslint-disable max-len */
import { put, takeEvery, call } from 'redux-saga/effects';

import actions from './actions';
import { CATEGORIES, LOG_POINTS } from './constants';

const fetchCategoriesUrl = 'https://private-anon-6062be0d7e-andelasocietiesapi.apiary-mock.com/api/v1/activity-types';
const postCategoriesUrl = 'https://private-anon-6062be0d7e-andelasocietiesapi.apiary-mock.com/api/v1/logged-activities';

const fetchCategories = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  return data;
};

function* handleCategoriesLoad() {
  try {
    const categories = yield call(fetchCategories, fetchCategoriesUrl);
    yield put(actions.setCategories(categories));
  } catch (error) {
    yield put(actions.setError(error.toString()));
  }
}

function* postActivityPoints(newActivity) {
  const response = yield fetch(postCategoriesUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      activityId: newActivity.activityId,
      date: newActivity.date,
      noOfParticipants: newActivity.noOfParticipants,
      description: newActivity.description,
    }),
  });
  return yield (response.status === 201);
}

function* addNewActivity(action) {
  try {
    const result = yield postActivityPoints(action.activity);
    if (result === true) {
      yield put(result);
    }
  } catch (error) {
    yield put(actions.setError(error.toString()));
  }
}

export function* watchLogActivityPoints() {
  yield takeEvery(LOG_POINTS.POST_REQUEST, addNewActivity);
}

export function* watchCategoriesLoad() {
  yield takeEvery(CATEGORIES.LOAD, handleCategoriesLoad);
}
