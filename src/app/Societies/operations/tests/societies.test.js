import {
  call, put, takeEvery, takeLatest, delay,
} from 'redux-saga/effects';

import types from '../types';
import actions from '../actions';
import { get, post, edit } from '../../../utils/api';
import activities from '../../../Dashboard/operations/tests/fixtures';
import watchFetchSocietyInfoReq, {
  createRedemption,
  fetchSocietyInfo,
  fetchSocietyRedemptions,
  verifyActivitySecretary,
  verifyActivitySuccess,
  watchCreateRedemptionReq,
  watchFetchSocietyRedemptionsReq,
  watchVerifyActivitySecretary,
  watchVerifyActivitySuccess,
} from '../societies.data';

describe('Society saga', () => {
  let generator;
  describe('watchFetchSocietyInfoReq generator', () => {
    it('takes FETCH_SOCIETY_INFO_REQUEST action', () => {
      generator = watchFetchSocietyInfoReq();
      expect(generator.next().value).toEqual(takeEvery(types.FETCH_SOCIETY_INFO_REQUEST, fetchSocietyInfo));
    });
  });

  describe('fetchSocietyInfo generator', () => {
    const societyName = 'phoenix';
    const action = {
      type: types.FETCH_SOCIETY_INFO_REQUEST,
      payload: { societyName },
    };
    const url = `societies?name=${societyName}`;

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

      expect(generator.next(result, societyName).value).toEqual(
        put(
          actions.fetchSocietyInfoSuccess(
            societyName,
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

      expect(generator.throw().value).toEqual(
        put(actions.societyPageError('There was an error fetching activities. Try again later')),
      );
    });
  });

  describe('watchFetchSocietyRedemptionsReq generator', () => {
    it('takes FETCH_SOCIETY_REDEMPTIONS_REQUEST action', () => {
      generator = watchFetchSocietyRedemptionsReq();
      expect(generator.next().value).toEqual(
        takeEvery(types.FETCH_SOCIETY_REDEMPTIONS_REQUEST, fetchSocietyRedemptions),
      );
    });
  });

  describe('fetchSocietyRedemptions generator', () => {
    const societyName = 'phoenix';
    const action = {
      type: types.FETCH_SOCIETY_REDEMPTIONS_REQUEST,
      payload: { societyName },
    };
    const url = `societies/redeem?society=${societyName}`;

    it('fetches society redemptions successfully', async () => {
      const result = {
        data: {
          redemptions: [],
        },
      };

      generator = fetchSocietyRedemptions(action);
      expect(generator.next().value).toEqual(put(actions.societyPageLoading()));

      expect(generator.next().value).toEqual(call(get, url));

      expect(generator.next(result, societyName).value).toEqual(
        put(actions.fetchSocietyRedemptionsSuccess(result.data, societyName)),
      );
    });

    it('fetch society redemptions error', () => {
      generator = fetchSocietyRedemptions(action);
      expect(generator.next().value).toEqual(put(actions.societyPageLoading()));

      expect(generator.next().value).toEqual(call(get, url));

      expect(generator.throw().value).toEqual(
        put(actions.societyPageError('There was an error fetching redemptions. Try again later')),
      );
    });
  });

  describe('watchCreateRedemptionReq generator', () => {
    it('takes CREATE_REDEMPTION_REQUEST action', () => {
      generator = watchCreateRedemptionReq();
      expect(generator.next().value).toEqual(
        takeEvery(types.CREATE_REDEMPTION_REQUEST, createRedemption),
      );
    });
  });

  describe('watchVerifyActivitySecretary generator', () => {
    it('takes VERIFY_ACTIVITY_REQUEST action', () => {
      generator = watchVerifyActivitySecretary();
      expect(generator.next().value).toEqual(takeLatest(types.VERIFY_ACTIVITY_REQUEST, verifyActivitySecretary));
    });
  });

  describe('verifyActivitySecretary generator', () => {
    it('calls edit api verify activity secretary util with url', async () => {
      generator = verifyActivitySecretary(types.VERIFY_ACTIVITY_REQUEST);
      expect(generator.next().value).toEqual(call(
        edit, `logged-activities/review/${actions.loggedActivityId}`, actions.activityStatus,
      ));
      expect(generator.next().value).toEqual(put(actions.verifyActivitySuccess()));
    });

    it('puts verifyActivityError', async () => {
      generator = verifyActivitySecretary();
      const err = new TypeError('Cannot read property \'loggedActivityId\' of undefined');
      expect(generator.next().value).toEqual(put(actions.verifyActivityFail(err.toString())));
    });
  });

  describe('watchVerifyActivitySuccess watcher', () => {
    it('takes VERIFY_ACTIVITY_SUCCESS action', () => {
      generator = watchVerifyActivitySuccess();
      expect(generator.next().value).toEqual(takeLatest(types.VERIFY_ACTIVITY_SUCCESS, verifyActivitySuccess));
    });
  });

  describe('verifyActivitySuccess generator', () => {
    it('opens and close toast message', async () => {
      generator = verifyActivitySuccess();
      expect(generator.next().value).toEqual(put({ type: types.VERIFY_ALERT_OPEN }));
      expect(generator.next().value).toEqual(delay(2000));
      expect(generator.next().value).toEqual(put({ type: types.VERIFY_ALERT_CLOSE }));
    });

    it('puts verifyActivityError', () => {
      generator = verifyActivitySuccess();
      expect(generator.next().value).toEqual(put({ type: types.VERIFY_ALERT_OPEN }));
      expect(generator
        .throw('An error has occured').value)
        .toEqual(
          put(actions.verifyActivityFail('An error has occured')),
        );
    });
  });

  describe('createRedemption generator', () => {
    const societyName = 'phoenix';
    const data = { date: '12/01/2018', center: 'nairobi', points: 10000, reason: 'to carryout tests'}
    const action = {
      type: types.CREATE_REDEMPTION_REQUEST,
      payload: { data, societyName },
    };
    const url = `/societies/redeem`;

    it('creates redemptions successfully', () => {
      const result = {
        data,
      };

      generator = createRedemption(action);
      expect(generator.next().value).toEqual(put(actions.societyPageLoading()));

      expect(generator.next().value).toEqual(call(post, url, data));

      expect(generator.next(result, societyName).value).toEqual(
        put(actions.createRedemptionSuccess(result.data, societyName)),
      );
    });

    it('create redemptions error', () => {
      generator = createRedemption(action);
      expect(generator.next().value).toEqual(put(actions.societyPageLoading()));

      expect(generator.next().value).toEqual(call(post, url, data));

      expect(generator.throw().value).toEqual(
        put(actions.societyPageError('There was an error creating your redemption')),
      );
    });
  });
});
