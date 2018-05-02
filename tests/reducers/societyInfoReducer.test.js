import societyInfoReducer from '../../src/reducers/societyInfoReducer';
import {
  FETCH_SOCIETY_INFO_REQUEST,
  FETCH_SOCIETY_INFO_SUCCESS,
  FETCH_SOCIETY_INFO_FAILURE,
} from '../../src/types';
import info from '../../src/fixtures/society';
import store from '../../src/fixtures/store';

describe('societyInfoReducer', () => {
  const initialState = store.societyInfo;

  it('should set default initial state', () => {
    expect(societyInfoReducer(undefined, {})).toEqual(initialState);
  });

  it('should return initial state when action is not defined', () => {
    expect(societyInfoReducer(initialState, { type: 'DOES_NOT_EXIST' })).toEqual(initialState);
  });

  it('should handle FETCH_SOCIETY_INFO_REQUEST', () => {
    expect(societyInfoReducer(initialState, {
      type: FETCH_SOCIETY_INFO_REQUEST,
    })).toEqual({
      requesting: true,
      error: {},
      info: store.societyInfo.info,
    });
  });

  it('should handle FETCH_SOCIETY_INFO_FAILURE', () => {
    expect(societyInfoReducer(initialState, {
      type: FETCH_SOCIETY_INFO_FAILURE,
      error: { error: 404 },
    })).toEqual({
      requesting: false,
      error: { error: 404 },
      info: store.societyInfo.info,
    });
  });

  it('should handle FETCH_SOCIETY_INFO_SUCCESS', () => {
    expect(societyInfoReducer(initialState, {
      type: FETCH_SOCIETY_INFO_SUCCESS,
      info,
    })).toEqual({
      requesting: false,
      error: {},
      info,
    });
  });
});
