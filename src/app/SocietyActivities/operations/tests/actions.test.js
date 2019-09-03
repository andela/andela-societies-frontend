import actions from '../actions';
import types from '../types';
import { societyDetails } from '../../components/tests/fixtures';

describe('approve logged activity actions', () => {
  it('has type APPROVE_ACTIVITY_PAGE_ERROR', () => {
    const error = 'There is an error';
    const expected = {
      type: types.APPROVE_ACTIVITY_PAGE_ERROR,
      payload: { error },
    };

    expect(actions.approveActivityPageError(error)).toEqual(expected);
  });

  it('has type APPROVE_ACTIVITY_PAGE_LOADING', () => {
    const expected = {
      type: types.APPROVE_ACTIVITY_PAGE_LOADING,
    };

    expect(actions.approveActivityPageLoading()).toEqual(expected);
  });

  it('has type RESET_APPROVE_ACTIVITY_STATUS', () => {
    const expected = {
      type: types.RESET_APPROVE_ACTIVITY_STATUS,
    };

    expect(actions.resetApproveActivityStatus()).toEqual(expected);
  });

  it('has type APPROVE_ACTIVITY_SUCCESS', () => {
    const id = 'abfb3328-43cd-11e8-82be-9801a7ae0329';
    const societyName = 'phoenix';
    const message = 'Activity Successfully Approved';
    const data = {};
    const expected = {
      type: types.APPROVE_ACTIVITY_SUCCESS,
      payload: {
        id, message, societyName, data,
      },
    };

    expect(actions.approveActivitySuccess(id, message, societyName, data)).toEqual(expected);
  });

  it('has type APPROVE_ACTIVITY_REQUEST', () => {
    const societyName = 'iStelle';
    const { id } = societyDetails;
    const expected = {
      type: types.APPROVE_ACTIVITY_REQUEST,
      payload: {
        id, societyName,
      },
    };

    expect(actions.approveActivityRequest(id, societyName)).toEqual(expected);
  });
});

describe('reject logged activity actions', () => {
  it('has type REJECT_ACTIVITY_PAGE_ERROR', () => {
    const error = 'There was an error';
    const expected = {
      type: types.REJECT_ACTIVITY_PAGE_ERROR,
      payload: { error },
    };

    expect(actions.rejectActivityPageError(error)).toEqual(expected);
  });

  it('has type REJECT_ACTIVITY_PAGE_LOADING', () => {
    const expected = {
      type: types.REJECT_ACTIVITY_PAGE_LOADING,
    };

    expect(actions.rejectActivityPageLoading()).toEqual(expected);
  });

  it('has type RESET_REJECT_ACTIVITY_STATUS', () => {
    const expected = {
      type: types.RESET_REJECT_ACTIVITY_STATUS,
    };

    expect(actions.resetRejectActivityStatus()).toEqual(expected);
  });

  it('has type REJECT_ACTIVITY_SUCCESS', () => {
    const id = 'abfb3328-43cd-11e8-82be-9801a7ae0329';
    const societyName = 'phoenix';
    const message = 'Activity Successfully Approved';
    const data = {};
    const expected = {
      type: types.REJECT_ACTIVITY_SUCCESS,
      payload: {
        id, message, societyName, data,
      },
    };

    expect(actions.rejectActivitySuccess(id, message, societyName, data)).toEqual(expected);
  });

  it('has type REJECT_ACTIVITY_REQUEST', () => {
    const status = 'rejected';
    const { id } = societyDetails;
    const expected = {
      type: types.REJECT_ACTIVITY_REQUEST,
      payload: {
        id, status,
      },
    };

    expect(actions.rejectActivityRequest(id, status)).toEqual(expected);
  });
});
