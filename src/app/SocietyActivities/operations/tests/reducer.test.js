import types from '../types';
import society from '../reducer';
import initialState from '../../../../reducers/initialState';
import { societyDetails } from '../../../Redemptions/components/tests/fixtures';

const defaultState = initialState.society;

describe('approve activity reducer tests', () => {
  it('it should update approveActivitypageLoading', () => {
    const action = {
      type: types.APPROVE_ACTIVITY_PAGE_LOADING,
    };

    expect(society(defaultState, action)).toEqual({
      ...defaultState,
      approveActivityPageLoading: true,
    });
  });

  it('it should update approveActivityPageError', () => {
    const error = 'an error occurred';
    const action = {
      type: types.APPROVE_ACTIVITY_PAGE_ERROR,
      payload: { error },
    };

    expect(society(defaultState, action)).toEqual({
      ...defaultState,
      approveActivityPageError: error,
    });
  });

  it('should handle approve activity success', () => {
    const id = '8431f00c-8e6b-11e8-bdf1-9801a7ae0329';
    const societyName = 'iStelle';
    const status = 'approved';
    const message = 'activity editted successfully';
    const data = { ...societyDetails };
    const action = {
      type: types.APPROVE_ACTIVITY_SUCCESS,
      payload: {
        id,
        message,
        societyName,
        data,
      },
    };

    const newInitialState = {
      ...defaultState,
      [societyName]: {
        ...defaultState[societyName],
        approveActivityStatus: status,
        loggedActivities: [],
      },
    };

    expect(society(newInitialState, action)).toEqual({
      ...newInitialState,
      approveActivityPageLoading: false,
      approveActivityStatus: data.status,
      approveActivityMessage: message,
      [societyName]: {
        ...newInitialState[societyName],
        loggedActivities: newInitialState[societyName]
          .loggedActivities.map(item => (item.id === id ? data : item)),
      },
    });
  });
});

describe('reject activity reducer tests', () => {
  it('it should update rejectActivityPageLoading', () => {
    const action = {
      type: types.REJECT_ACTIVITY_PAGE_LOADING,
    };

    expect(society(defaultState, action)).toEqual({
      ...defaultState,
      rejectActivityPageLoading: true,
      rejectActivityPageError: null,
    });
  });

  it('it should update rejectActivityPageError', () => {
    const error = 'an error occurred';
    const action = {
      type: types.REJECT_ACTIVITY_PAGE_ERROR,
      payload: { error },
    };

    expect(society(defaultState, action)).toEqual({
      ...defaultState,
      rejectActivityPageLoading: false,
      rejectActivityPageError: error,
    });
  });

  it('should handle approve activity success', () => {
    const id = '8431f00c-8e6b-11e8-bdf1-9801a7ae0329';
    const societyName = 'iStelle';
    const status = 'approved';
    const message = 'activity editted successfully';
    const data = { ...societyDetails };
    const action = {
      type: types.REJECT_ACTIVITY_SUCCESS,
      payload: {
        id,
        message,
        societyName,
        data,
      },
    };

    const newInitialState = {
      ...defaultState,
      [societyName]: {
        ...defaultState[societyName],
        rejectActivityStatus: status,
        loggedActivities: [],
      },
    };

    expect(society(newInitialState, action)).toEqual({
      ...newInitialState,
      rejectActivityPageLoading: false,
      rejectActivityStatus: data.status,
      rejectActivityMessage: message,
      [societyName]: {
        ...newInitialState[societyName],
        loggedActivities: newInitialState[societyName]
          .loggedActivities.map(item => (item.id === id ? data : item)),
      },
    });
  });
});
