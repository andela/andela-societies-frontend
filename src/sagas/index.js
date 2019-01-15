import { all } from 'redux-saga/effects';

const watchIncrementAsync = {};

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchIncrementAsync,
  ]);
}
