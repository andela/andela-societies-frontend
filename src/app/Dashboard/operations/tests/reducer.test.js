import types from '../types';
import dashboard from '../reducer';
import { myloggedActivities, categories, myActivityItem } from './fixtures';
import initialState from '../../../../reducers/initialState';

const defaultState = initialState.dashboard;

describe('Dashboard reducer', () => {
  describe('handles case no action', () => {
    it('returns the initial state', () => {
      expect(dashboard(defaultState, { type: 'DOES_NOT_EXIST' })).toEqual(defaultState);
    });
  });

  describe('handles case FETCH_USER_ACTIVITIES_REQUEST', () => {
    it('returns loading true', () => {
      expect(
        dashboard(defaultState, {
          type: types.FETCH_USER_ACTIVITIES_REQUEST,
          userId: 23,
        }),
      ).toEqual({
        error: null,
        dlevel: '',
        society: '',
        loading: true,
        pointsEarned: 0,
        userActivities: [],
        activitiesLogged: 0,
        showToastMessage: false,
        activity: {},
        categories: [],
      });
    });
  });

  describe('handles case FETCH_USER_ACTIVITIES_ERROR', () => {
    it('returns error', () => {
      const error = new Error('Request failed with status code 401');
      expect(
        dashboard(defaultState, {
          type: types.FETCH_USER_ACTIVITIES_ERROR,
          error,
        }),
      ).toEqual({
        error,
        dlevel: '',
        society: '',
        loading: false,
        pointsEarned: 0,
        userActivities: [],
        activitiesLogged: 0,
        showToastMessage: false,
        activity: {},
        categories: [],
      });
    });
  });

  describe('handles case FETCH_USER_ACTIVITIES_SUCCESS', () => {
    it('returns poinstEarned, activitiesLogged and userActivities', () => {
      const {
        data,
        society,
        pointsEarned,
        activitiesLogged,
        activity,
        level: { name },
      } = myloggedActivities;
      expect(
        dashboard(defaultState, {
          type: types.FETCH_USER_ACTIVITIES_SUCCESS,
          dlevel: name,
          society,
          activities: data,
          pointsEarned,
          activitiesLogged,
          categories: [],
        }),
      ).toEqual({
        society,
        dlevel: name,
        error: null,
        pointsEarned,
        loading: false,
        activitiesLogged,
        showToastMessage: false,
        userActivities: data,
        categories: [],
        activity,
      });
    });
  });
});

describe('handles case CATEGORIES_SUCCESS', () => {
  it('returns society activity categories', () => {
    const { activity } = myloggedActivities;
    expect(
      dashboard(defaultState, {
        type: types.CATEGORIES_SUCCESS,
        categories,
      }),
    ).toEqual({
      society: '',
      dlevel: '',
      error: null,
      pointsEarned: 0,
      loading: false,
      activitiesLogged: 0,
      userActivities: [],
      showToastMessage: false,
      activity,
    });
  });
});

describe('handles case LOG_POINTS_REQUEST', () => {
  it('returns loading false', () => {
    expect(
      dashboard(defaultState, {
        type: types.LOG_POINTS_REQUEST,
      }),
    ).toEqual({
      error: null,
      society: '',
      dlevel: '',
      loading: false,
      pointsEarned: 0,
      userActivities: [],
      activitiesLogged: 0,
      showToastMessage: false,
      activity: {},
      categories: [],
    });
  });
});

describe('handles case LOG_POINTS_SUCCESS', () => {
  it('returns the created society activity', () => {
    const { activity } = myActivityItem;
    expect(
      dashboard(defaultState, {
        type: types.LOG_POINTS_SUCCESS,
        activity,
        userActivities: [],
      }),
    ).toEqual({
      error: null,
      society: '',
      dlevel: '',
      loading: false,
      pointsEarned: 0,
      activitiesLogged: 1,
      activity,
      showToastMessage: false,
      categories: [],
      userActivities: [activity.data],
    });
  });
});

describe('handles case LOG_POINTS_FAIL', () => {
  it('returns error', () => {
    const error = new Error('Request failed with status code 401');
    expect(
      dashboard(defaultState, {
        type: types.LOG_POINTS_FAIL,
        error,
      }),
    ).toEqual({
      error,
      society: '',
      dlevel: '',
      loading: false,
      pointsEarned: 0,
      userActivities: [],
      activitiesLogged: 0,
      showToastMessage: false,
      activity: {},
      categories: [],
    });
  });
});

describe('handles case LOG_ACTIVITY_TOAST_OPEN', () => {
  it('returns toast message', () => {
    expect(
      dashboard(defaultState, {
        type: types.LOG_ACTIVITY_TOAST_OPEN,
        showToastMessage: true,
      }),
    ).toEqual({
      error: null,
      society: '',
      loading: false,
      dlevel: '',
      pointsEarned: 0,
      activitiesLogged: 0,
      activity: {},
      showToastMessage: true,
      categories: [],
      userActivities: [],
    });
  });
});

describe('handles case LOG_ACTIVITY_TOAST_CLOSE', () => {
  it('hides toast message', () => {
    const {
      activity,
    } = myloggedActivities;
    expect(
      dashboard(defaultState, {
        type: types.LOG_ACTIVITY_TOAST_CLOSE,
        showToastMessage: false,
        userActivities: [],
      }),
    ).toEqual({
      error: null,
      society: '',
      loading: false,
      dlevel: '',
      pointsEarned: 0,
      activitiesLogged: 0,
      activity,
      showToastMessage: false,
      categories: [],
      userActivities: [],
    });
  });
});
