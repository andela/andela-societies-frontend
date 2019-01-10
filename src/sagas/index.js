import { all } from 'redux-saga/effects';
import { watchIncrementAsync } from '../app/Home/operations/home.data';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchIncrementAsync(),
  ]);
}
