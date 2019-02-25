import { all, fork } from 'redux-saga/effects';

import { watchCategoriesLoad, watchLogActivityPoints } from '../app/Home/operations/home.data';
import watchFetchUserActivitiesRequest from '../app/Dashboard/operations';

const watchIncrementAsync = {};

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([watchIncrementAsync,
    fork(watchFetchUserActivitiesRequest),
    watchCategoriesLoad(),
    watchLogActivityPoints(),
  ]);
}
