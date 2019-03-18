import { call, put, takeEvery } from 'redux-saga/effects';

import types from '../types';
import actions from '../actions';
import { get } from '../../../utils/api';
import activities from '../../../Dashboard/operations/tests/fixtures';
import watchFetchSocietyInfoReq, { fetchSocietyInfo } from '../societies.data';

describe('Society saga', () => {
  let generator;
  describe('watchFetchSocietyInfoReq generator', () => {
    it('takes FETCH_SOCIETY_INFO_REQUEST action', () => {
      generator = watchFetchSocietyInfoReq();
      expect(generator.next().value).toEqual(takeEvery(types.FETCH_SOCIETY_INFO_REQUEST, fetchSocietyInfo));
    });
  });

  describe('fetchSocietyInfo generator', () => {
    const action = {
      type: types.FETCH_SOCIETY_INFO_REQUEST,
      payload: { societyName: 'phoenix' },
    };
    const url = `societies?name=${action.payload.societyName}`;

    it('fetches society info successfully', async () => {
      const result = {
        societyDetails: {
          totalPoints: 200,
          usedPoints: 100,
          remainingPoints: 100,
          loggedActivities: activities,
          activitiesLogged: activities.length,
        },
      };

      generator = fetchSocietyInfo(action);
      expect(generator.next().value).toEqual(put(actions.societyPageLoading()));

      expect(generator.next().value).toEqual(call(get, url));

      expect(generator.next(result).value).toEqual(
        put(
          actions.fetchSocietyInfoSuccess(
            result.societyDetails.totalPoints,
            result.societyDetails.usedPoints,
            result.societyDetails.remainingPoints,
            result.societyDetails.loggedActivities,
            result.societyDetails.activitiesLogged,
          ),
        ),
      );
    });

    it('fetch society info error', () => {
      generator = fetchSocietyInfo(action);
      expect(generator.next().value).toEqual(put(actions.societyPageLoading()));

      expect(generator.next().value).toEqual(call(get, url));

      expect(generator.throw('There is an error').value).toEqual(put(actions.societyPageError()));
    });
  });
});
