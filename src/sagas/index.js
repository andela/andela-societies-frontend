import { all, fork } from 'redux-saga/effects';

import watchFetchUserActivitiesRequest from '../app/Dashboard/operations';
import { watchCategoriesLoad, watchLogActivityPoints } from '../app/Dashboard/operations/logPoints.data';

const watchIncrementAsync = {};

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([watchIncrementAsync,
    fork(watchFetchUserActivitiesRequest),
    fork(watchCategoriesLoad),
    fork(watchLogActivityPoints),
  ]);
}
