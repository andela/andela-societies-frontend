/* eslint-disable max-len */
import { put, takeEvery, call } from 'redux-saga/effects';

import actions from './actions';
import types from './types';

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

function postActivityPoints(newActivity) {
  return fetch(postCategoriesUrl, {
    method: 'POST',
    headers: new Headers(),
    body: JSON.stringify({
      activityId: newActivity.activityId,
      date: newActivity.date,
      noOfParticipants: newActivity.noOfParticipants,
      description: newActivity.description,
    }),
  }).then(res => res.json())
    .then(data => data)
    .catch(err => err);
}

// function* postActivityPoints(newActivity) {
//   const response = yield fetch(postCategoriesUrl, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       activityId: newActivity.activityId,
//       date: newActivity.date,
//       noOfParticipants: newActivity.noOfParticipants,
//       description: newActivity.description,
//     }),
//   });
//   return yield (response.status === 201);
// }

function* addNewActivity(action) {
  try {
    const result = yield postActivityPoints(action.activity);
    console.log('resulyt >>>>>', result);
    yield put(actions.logPointsSuccess(result));
  } catch (error) {
    yield put(actions.setError(error.toString()));
  }
}

// function* addNewActivity(action) {
//     try {
//       const response = yield call(postActivityPoints);
//       const dog = response.data.message;
//       // dispatch a success action to the store with the new dog
//       yield put({ type: "API_CALL_SUCCESS", dog });
//     } catch (error) {
//       // dispatch a failure action to the store with the error
//       yield put({ type: "API_CALL_FAILURE", error });
//     }
//   }

export function* watchLogActivityPoints() {
  yield takeEvery(types.LOG_POINTS.POST_REQUEST, addNewActivity);
}

export function* watchCategoriesLoad() {
  yield takeEvery(types.CATEGORIES.LOAD, handleCategoriesLoad);
}
