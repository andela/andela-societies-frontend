import types from '../types';
import society from '../reducer';
import initialState from '../../../../reducers/initialState';
import activities, { review } from '../../../Dashboard/operations/tests/fixtures';
import { redemption } from '../../../Redemptions/components/tests/fixtures';

const defaultState = initialState.society;

describe('Society reducer', () => {
  describe('case default', () => {
    it('returns the initial state', () => {
      expect(society(defaultState, { type: 'DOES_NOT_EXIST' })).toEqual(defaultState);
    });
  });

  describe('case SOCIETY_PAGE_LOADING', () => {
    it('toggles loading state', () => {
      const action = {
        type: types.SOCIETY_PAGE_LOADING,
      };
      expect(society(defaultState, action)).toEqual({ ...defaultState, loading: true });
    });
  });

  describe('case SOCIETY_PAGE_ERROR', () => {
    it('toggles error state', () => {
      const error = 'There is an error in tests';
      const action = {
        type: types.SOCIETY_PAGE_ERROR,
        payload: { error },
      };
      expect(society(defaultState, action)).toEqual({ ...defaultState, error });
    });
  });

  describe('case FETCH_SOCIETY_INFO_SUCCESS', () => {
    it('updates pointsEarned, usedPoints, remainingPoints, loggedActivities', () => {
      const societyName = 'phoenix';
      const payload = {
        societyName,
        pointsEarned: 200,
        usedPoints: 100,
        remainingPoints: 100,
        loggedActivities: activities,
        activitiesLogged: activities.length,
      };
      const action = {
        type: types.FETCH_SOCIETY_INFO_SUCCESS,
        payload,
      };
      expect(society(defaultState, action)).toEqual({
        ...defaultState,
        [societyName]: {
          ...defaultState[societyName],
          pointsEarned: 200,
          usedPoints: 100,
          remainingPoints: 100,
          loggedActivities: activities,
          activitiesLogged: activities.length,
        },
      });
    });
  });

  describe('case FETCH_SOCIETY_REDEMPTIONS_SUCCESS', () => {
    it('updates redemptions', () => {
      const societyName = 'phoenix';
      const payload = {
        societyName,
        redemptions: [],
      };
      const action = {
        type: types.FETCH_SOCIETY_REDEMPTIONS_SUCCESS,
        payload,
      };
      expect(society(defaultState, action)).toEqual({
        ...defaultState,
        [societyName]: {
          ...defaultState[societyName],
          redemptions: [],
        },
      });
    });
  });

  describe('handles case VERIFY_ACTIVITY_SUCCESS', () => {
    it('verifies activity successfully', () => {
      const societyName = 'phoenix';
      const action = {
        type: types.VERIFY_ACTIVITY_SUCCESS,
        payload: review,
      };
      expect(society(defaultState, action)).not.toEqual({
        ...defaultState,
        [societyName]: {
          ...defaultState[societyName],
          loggedActivities: [],
          verifiedSecretaryActivity: {
            owner: action.payload.data.owner,
            points: action.payload.data.points,
          },
        },
      });
    });
  });

  describe('case APPROVE_BUDGET_PAGE_LOADING', () => {
    it('updates approveBudgetPageLoading', () => {
      const action = {
        type: types.APPROVE_BUDGET_PAGE_LOADING,
      };

      expect(society(defaultState, action)).toEqual({
        ...defaultState,
        approveBudgetPageError: null,
        approveBudgetPageLoading: true,
      });
    });
  });

  describe('handles case LOG_ACTIVITY_TOAST_OPEN', () => {
    it('returns toast message', () => {
      expect(
        society(defaultState, {
          type: types.VERIFY_ALERT_OPEN,
          verifyAlertMessage: true,
        }),
      ).toEqual({
        ...defaultState,
        verifyAlertMessage: true,
      });
    });
  });

  describe('handles case LOG_ACTIVITY_TOAST_OPEN', () => {
    it('returns toast message', () => {
      expect(
        society(defaultState, {
          type: types.VERIFY_ALERT_CLOSE,
          verifyAlertMessage: false,
          verifiedSecretaryActivity: {},
        }),
      ).toEqual({
        ...defaultState,
        verifyAlertMessage: false,
      });
    });
  });

  describe('case APPROVE_BUDGET_PAGE_ERROR', () => {
    it('updates approveBudgetPageError', () => {
      const error = 'There is an error';
      const action = {
        type: types.APPROVE_BUDGET_PAGE_ERROR,
        payload: { error },
      };

      expect(society(defaultState, action)).toEqual({
        ...defaultState,
        approveBudgetPageError: error,
        approveBudgetPageLoading: false,
      });
    });
  });

  describe('case CREATE_REDEMPTION_SUCCESS', () => {
    it('creates redemption', () => {
      const societyName = 'phoenix';
      const payload = {
        societyName,
        redemption,
      };
      const action = {
        type: types.CREATE_REDEMPTION_SUCCESS,
        payload,
      };
      expect(society(defaultState, action)).toEqual({
        ...defaultState,
        [societyName]: {
          ...defaultState[societyName],
          redemptions: [payload.redemption, ...defaultState[societyName].redemptions],
        },
      });
    });
  });

  describe('case RESET_APPROVE_BUDGET_STATUS', () => {
    it('updates approveBudgetMessage and approveBudgetStatus', () => {
      const action = {
        type: types.RESET_APPROVE_BUDGET_STATUS,
      };

      expect(society(defaultState, action)).toEqual({
        ...defaultState,
        approveBudgetStatus: null,
        approveBudgetMessage: null,
      });
    });
  });

  describe('handles case LOG_ACTIVITY_TOAST_OPEN', () => {
    it('returns toast message', () => {
      expect(
        society(defaultState, {
          type: types.VERIFY_ALERT_OPEN,
          verifyAlertMessage: true,
        }),
      ).toEqual({
        ...defaultState,
        verifyAlertMessage: true,
      });
    });
  });

  describe('case RESET_APPROVE_BUDGET_STATUS', () => {
    it('updates approveBudgetMessage and approveBudgetStatus', () => {
      const action = {
        type: types.RESET_APPROVE_BUDGET_STATUS,
      };

      expect(society(defaultState, action)).toEqual({
        ...defaultState,
        approveBudgetStatus: null,
        approveBudgetMessage: null,
      });
    });
  });

  describe('case APPROVE_BUDGET_SUCCESS', () => {
    it('updates approveBudgetMessage, approveBudgetStatus, approveBudgetPageLoading, society redemptions ', () => {
      const societyName = 'phoenix';
      const status = 'rejected';
      const message = '200 Rejected';
      const action = {
        type: types.APPROVE_BUDGET_SUCCESS,
        payload: {
          redemption,
          societyName,
          status,
          message,
        },
      };

      const newInitialState = {
        ...defaultState,
        [societyName]: {
          ...defaultState[societyName],
          redemptions: [redemption],
        },
      };

      expect(society(newInitialState, action)).toEqual({
        ...newInitialState,
        approveBudgetStatus: status,
        approveBudgetMessage: message,
        approveBudgetPageLoading: false,
        [societyName]: {
          ...newInitialState[societyName],
          redemptions: newInitialState[societyName].redemptions
            .map(el => (el.id === action.payload.redemption.id ? action.payload.redemption : el)),
        },
      });
    });
  });

  describe('case CREATE_REDEMPTION_SUCCESS', () => {
    it('creates redemption', () => {
      const societyName = 'phoenix';
      const payload = {
        societyName,
        redemption,
      };
      const action = {
        type: types.CREATE_REDEMPTION_SUCCESS,
        payload,
      };
      expect(society(defaultState, action)).toEqual({
        ...defaultState,
        [societyName]: {
          ...defaultState[societyName],
          redemptions: [payload.redemption, ...defaultState[societyName].redemptions],
        },
      });
    });
  });
});
