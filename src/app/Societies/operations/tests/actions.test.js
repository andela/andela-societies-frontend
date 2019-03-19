import actions from '../actions';
import types from '../types';
import activities from '../../../Dashboard/operations/tests/fixtures';

describe('Societies actions', () => {
  describe('page loading', () => {
    it('has type SOCIETY_PAGE_LOADING', () => {
      const expected = {
        type: types.SOCIETY_PAGE_LOADING
      };
      expect(actions.societyPageLoading()).toEqual(expected);
    });
  });

  describe('page error', () => {
    it('has type SOCIETY_PAGE_ERROR', () => {
      const expected = {
        type: types.SOCIETY_PAGE_ERROR
      };
      expect(actions.societyPageError()).toEqual(expected);
    });
  });

  describe('fetch society information', () => {
    it('has type FETCH_SOCIETY_INFO_REQUEST', () => {
      const expected = {
        type: types.FETCH_SOCIETY_INFO_REQUEST,
        payload: { societyName: 'phoenix' }
      };

      expect(actions.fetchSocietyInfoRequest('phoenix')).toEqual(expected);
    });

    it('has type FETCH_SOCIETY_INFO_SUCCESS', () => {
      const expected = {
        type: types.FETCH_SOCIETY_INFO_SUCCESS,
        payload: { 
          pointsEarned: 200,
          usedPoints: 100,
          remainingPoints: 100,
          loggedActivities: activities,
          activitiesLogged: activities.length,
         }
      };

      expect(actions.fetchSocietyInfoSuccess(200, 100, 100, activities, activities.length)).toEqual(expected);
    });
  });
});
