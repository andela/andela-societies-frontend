import fetchMock from 'fetch-mock';
import { takeLatest, call, put } from 'redux-saga/effects';

import types from '../types';
import actions from '../actions';
import { get } from '../../../utils/api';
import config from '../../../../../config';
import watchFetchUserActivitiesRequest, { fetchUserActivities } from '../dashboard.data';

describe('Dashboard saga', () => {
  let generator;
  describe('watchFetchUserActivitiesRequest generator', () => {
    it('takes FETCH_USER_ACTIVITIES_REQUEST action', () => {
      generator = watchFetchUserActivitiesRequest();
      expect(generator.next().value).toEqual(takeLatest(types.FETCH_USER_ACTIVITIES_REQUEST, fetchUserActivities));
    });
  });

  describe('fetchUserActivities generator', () => {
    const action = {
      type: types.FETCH_USER_ACTIVITIES_SUCCESS,
      userId: 1,
    };

    it('puts fetchUserActivitiesError', async () => {
      generator = fetchUserActivities();
      const err = new TypeError('Cannot read property \'userId\' of undefined');
      expect(generator.next().value).toEqual(put(actions.fetchUserActivitiesError(err)));
    });

    it('calls get api util with url', async () => {
      const result = {
        data: [],
        pointsEarned: 20,
        activitiesLogged: 2,
      };
      call(get, `users/${action.userId}/logged-activities`);
      fetchMock.get(`${config.API_BASE_URL}/users/${action.userId}/logged-activities`, { ...result });
      generator = fetchUserActivities(action);
      expect(generator.next().value).toEqual(call(get, `users/${action.userId}/logged-activities`));
      fetchMock.reset();
    });
  });
});
