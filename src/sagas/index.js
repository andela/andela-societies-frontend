import { all, fork } from 'redux-saga/effects';
import { watchFetchUserRoleRequest } from '../app/Sidebar/operations';
import watchFetchUserActivitiesRequest, { watchLogActivitySuccess } from '../app/Dashboard/operations/dashboard.data';
import { watchCategoriesLoad, watchLogActivityPoints } from '../app/Dashboard/operations/logPoints.data';
import {
  watchFetchSocietyInfoReq,
  watchCreateRedemptionReq,
  watchApproveBudgetRequest,
  watchFetchSocietyRedemptionsReq,
  watchVerifyActivitySecretary,
  watchVerifyActivitySuccess,
} from '../app/Societies/operations';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    fork(watchFetchUserActivitiesRequest),
    fork(watchCategoriesLoad),
    fork(watchLogActivityPoints),
    fork(watchFetchSocietyInfoReq),
    fork(watchFetchUserRoleRequest),
    fork(watchLogActivitySuccess),
    fork(watchCreateRedemptionReq),
    fork(watchApproveBudgetRequest),
    fork(watchFetchSocietyRedemptionsReq),
    fork(watchVerifyActivitySecretary),
    fork(watchVerifyActivitySuccess),
  ]);
}
