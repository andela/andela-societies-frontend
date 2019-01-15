import { all, fork } from 'redux-saga/effects';
import { watchFetchSocietyInfoReq } from '../app/Societies/operations';
import watchFetchUserActivitiesRequest, { watchLogActivitySuccess } from '../app/Dashboard/operations/dashboard.data';
import { watchCategoriesLoad, watchLogActivityPoints } from '../app/Dashboard/operations/logPoints.data';


// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    fork(watchFetchUserActivitiesRequest),
    fork(watchCategoriesLoad),
    fork(watchLogActivityPoints),
    fork(watchFetchSocietyInfoReq),
    fork(watchLogActivitySuccess),
  ]);
}
