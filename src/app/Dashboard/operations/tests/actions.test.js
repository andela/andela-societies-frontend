import actions from '../actions';
import types from '../types';
import { myloggedActivities } from './fixtures';

describe('Dashboard actions', () => {
  describe('fetch user activites request', () => {
    it('has a type of FETCH_USER_ACTIVITIES_REQUEST', () => {
      const expected = {
        type: types.FETCH_USER_ACTIVITIES_REQUEST,
      };
      expect(actions.fetchUserActivitiesRequest()).toEqual(expected);
    });
  });

  describe('fetch user activites error', () => {
    it('has a type of FETCH_USER_ACTIVITIES_ERROR', () => {
      const errorMsg = 'No projects';
      const expected = {
        type: types.FETCH_USER_ACTIVITIES_ERROR,
        error: errorMsg,
      };
      expect(actions.fetchUserActivitiesError(errorMsg)).toEqual(expected);
    });
  });

  describe('fetch user activities success', () => {
    it('has a type of FETCH_USER_ACTIVITIES_SUCCESS', () => {
      const { data, pointsEarned, activitiesLogged } = myloggedActivities;
      const expected = {
        type: types.FETCH_USER_ACTIVITIES_SUCCESS,
        activites: data,
        pointsEarned: pointsEarned,
        activitiesLogged: activitiesLogged,
      };
      expect(actions.fetchUserActivitiesSuccess(data, pointsEarned, activitiesLogged)).toEqual(expected);
    });
  });
});
