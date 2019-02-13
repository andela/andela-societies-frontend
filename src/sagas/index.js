import { all, fork } from 'redux-saga/effects';
import watchFetchUserActivitiesRequest from '../app/Dashboard/operations';

const watchIncrementAsync = {};

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([watchIncrementAsync, fork(watchFetchUserActivitiesRequest)]);
}
