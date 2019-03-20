import { all, fork } from 'redux-saga/effects';
import { watchFetchUserRoleRequest } from '../app/Sidebar/operations';
import watchFetchUserActivitiesRequest from '../app/Dashboard/operations';
import { watchCategoriesLoad, watchLogActivityPoints } from '../app/Dashboard/operations/logPoints.data';
import { watchFetchSocietyInfoReq, watchFetchSocietyRedemptionsReq } from '../app/Societies/operations';

const watchIncrementAsync = {};

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchIncrementAsync,
    fork(watchCategoriesLoad),
    fork(watchLogActivityPoints),
    fork(watchFetchSocietyInfoReq),
    fork(watchFetchUserRoleRequest),
    fork(watchFetchUserActivitiesRequest),
    fork(watchFetchSocietyRedemptionsReq),
  ]);
}
