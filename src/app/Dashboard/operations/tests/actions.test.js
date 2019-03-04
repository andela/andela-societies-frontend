import actions from '../actions';
import types from '../types';
import { myloggedActivities, categories } from './fixtures';

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
        pointsEarned,
        activitiesLogged,
      };
      expect(actions.fetchUserActivitiesSuccess(data, pointsEarned, activitiesLogged)).toEqual(expected);
    });
  });

  describe('fetch categories request', () => {
    it('has a type of CATEGORIES.LOAD', () => {
      const expected = {
        type: types.CATEGORIES.LOAD,
      };
      expect(actions.loadCategories()).toEqual(expected);
    });
  });

  describe('fetch categories request is successful', () => {
    it('has a type of CATEGORIES.LOAD_SUCCESS', () => {
      const expected = {
        type: types.CATEGORIES.LOAD_SUCCESS,
        categories,
      };
      expect(actions.setCategories(categories)).toEqual(expected);
    });
  });

  describe('fetch categories error', () => {
    it('has a type of CATEGORIES.LOAD_FAIL', () => {
      const { categoryError } = myloggedActivities;
      const expected = {
        type: types.CATEGORIES.LOAD_FAIL,
        error: categoryError,
      };
      expect(actions.setError(categoryError)).toEqual(expected);
    });
  });

  describe('fetch log activity points request', () => {
    it('has a type of LOG_POINTS.POST_REQUEST', () => {
      const expected = {
        type: types.LOG_POINTS.POST_REQUEST,
      };
      expect(actions.logPointsRequest()).toEqual(expected);
    });
  });

  describe('fetch log activity points request is successful', () => {
    it('has a type of LOG_POINTS.POST_SUCCESS', () => {
      const { activity } = myloggedActivities;
      const expected = {
        type: types.LOG_POINTS.POST_SUCCESS,
        activity,
      };
      expect(actions.logPointsSuccess(activity)).toEqual(expected);
    });
  });

  describe('fetch log activity points error', () => {
    it('has a type of LOG_POINTS.POST_FAIL', () => {
      const { logError } = myloggedActivities;
      const expected = {
        type: types.LOG_POINTS.POST_FAIL,
        error: logError,
      };
      expect(actions.logPointsFail(logError)).toEqual(expected);
    });
  });
});
