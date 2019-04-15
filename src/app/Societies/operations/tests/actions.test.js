import actions from '../actions';
import types from '../types';
import activities from '../../../Dashboard/operations/tests/fixtures';
import { redemption } from '../../../Redemptions/components/tests/fixtures';

describe('Societies actions', () => {
  describe('page loading', () => {
    it('has type SOCIETY_PAGE_LOADING', () => {
      const expected = {
        type: types.SOCIETY_PAGE_LOADING,
      };
      expect(actions.societyPageLoading()).toEqual(expected);
    });
  });

  describe('page error', () => {
    it('has type SOCIETY_PAGE_ERROR', () => {
      const error = 'There is an error';
      const expected = {
        type: types.SOCIETY_PAGE_ERROR,
        payload: { error },
      };
      expect(actions.societyPageError(error)).toEqual(expected);
    });
  });

  describe('fetch society information', () => {
    const societyName = 'phoenix';
    it('has type FETCH_SOCIETY_INFO_REQUEST', () => {
      const expected = {
        type: types.FETCH_SOCIETY_INFO_REQUEST,
        payload: { societyName },
      };

      expect(actions.fetchSocietyInfoRequest(societyName)).toEqual(expected);
    });

    it('has type FETCH_SOCIETY_INFO_SUCCESS', () => {
      const expected = {
        type: types.FETCH_SOCIETY_INFO_SUCCESS,
        payload: {
          societyName,
          pointsEarned: 200,
          usedPoints: 100,
          remainingPoints: 100,
          loggedActivities: activities,
          activitiesLogged: activities.length,
        },
      };

      expect(actions.fetchSocietyInfoSuccess(societyName, 200, 100, 100, activities, activities.length)).toEqual(
        expected,
      );
    });
  });

  describe('fetch society redemptions', () => {
    const societyName = 'phoenix';
    it('has type FETCH_SOCIETY_REDEMPTIONS_REQUEST', () => {
      const expected = {
        type: types.FETCH_SOCIETY_REDEMPTIONS_REQUEST,
        payload: { societyName },
      };

      expect(actions.fetchSocietyRedemptionsRequest(societyName)).toEqual(expected);
    });

    it('has type FETCH_SOCIETY_REDEMPTIONS_SUCCESS', () => {
      const redemptions = [];
      const expected = {
        type: types.FETCH_SOCIETY_REDEMPTIONS_SUCCESS,
        payload: {
          societyName,
          redemptions,
        },
      };

      expect(actions.fetchSocietyRedemptionsSuccess(redemptions, societyName)).toEqual(expected);
    });
  });

  describe('create redemption', () => {
    it('has CREATE_REDEMPTION_REQUEST', () => {
      const data = { date: '12/01/2018', reason: 'test', points: 10000 };
      const societyName = 'phoenix';
      const expected = {
        type: types.CREATE_REDEMPTION_REQUEST,
        payload: { data, societyName },
      };

      expect(actions.createRedemptionRequest(data, societyName)).toEqual(expected);
    });

    it('has CREATE_REDEMPTION_SUCCESS', () => {
      const data = { date: '12/01/2018', reason: 'test', points: 10000 };
      const societyName = 'phoenix';
      const expected = {
        type: types.CREATE_REDEMPTION_SUCCESS,
        payload: { redemption: data, societyName },
      };

      expect(actions.createRedemptionSuccess(data, societyName)).toEqual(expected);
    });
  });

  describe('approve budget action', () => {
    it('has type APPROVE_BUDGET_PAGE_ERROR', () => {
      const error = 'There is an error';
      const expected = {
        type: types.APPROVE_BUDGET_PAGE_ERROR,
        payload: { error },
      };

      expect(actions.approveBudgetPageError(error)).toEqual(expected);
    });

    it('has type APPROVE_BUDGET_PAGE_LOADING', () => {
      const expected = {
        type: types.APPROVE_BUDGET_PAGE_LOADING,
      };

      expect(actions.approveBudgetPageLoading()).toEqual(expected);
    });

    it('has type RESET_APPROVE_BUDGET_STATUS', () => {
      const expected = {
        type: types.RESET_APPROVE_BUDGET_STATUS,
      };

      expect(actions.resetApproveBugetStatus()).toEqual(expected);
    });

    it('has type APPROVE_BUDGET_SUCCESS', () => {
      const societyName = 'phoenix';
      const status = 'rejected';
      const message = '200 Rejected';
      const expected = {
        type: types.APPROVE_BUDGET_SUCCESS,
        payload: {
          redemption, societyName, status, message,
        },
      };

      expect(actions.approveBudgetSuccess(redemption, societyName, status, message)).toEqual(expected);
    });
  });

  it('has type APPROVE_BUDGET_REQUEST', () => {
    const societyName = 'phoenix';
    const status = 'rejected';
    const id = redemption.id;
    const expected = {
      type: types.APPROVE_BUDGET_REQUEST,
      payload: {
        societyName, status, id,
      },
    };

    expect(actions.approveBudgetRequest({ id, societyName, status })).toEqual(expected);
  });

});
