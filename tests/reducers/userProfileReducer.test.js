import userProfileReducer from '../../src/reducers/userProfileReducer';
import {
  FETCH_USER_PROFILE_REQUEST,
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILURE,
} from '../../src/types';
import store from '../../src/fixtures/store';
import testProfile from '../../src/fixtures/userProfile';

describe('userProfileReducer', () => {
  const initialState = store.userProfile;

  it('should set default initial state', () => {
    expect(userProfileReducer(undefined, {})).toEqual(initialState);
  });

  it('should return initial state when action is not defined', () => {
    expect(userProfileReducer(initialState, { type: 'DOES_NOT_EXIST' })).toEqual(initialState);
  });

  it('should handle FETCH_USER_PROFILE_REQUEST', () => {
    expect(userProfileReducer(initialState, {
      type: FETCH_USER_PROFILE_REQUEST,
    })).toEqual({
      requesting: true,
      info: store.userProfile.info,
      error: {},
    });
  });

  it('should handle FETCH_USER_PROFILE_FAILURE', () => {
    expect(userProfileReducer(initialState, {
      type: FETCH_USER_PROFILE_FAILURE,
      error: { error: 404 },
    })).toEqual({
      requesting: false,
      error: { error: 404 },
      info: store.userProfile.info,
    });
  });

  it('should handle FETCH_USER_PROFILE_SUCCESS', () => {
    expect(userProfileReducer(initialState, {
      type: FETCH_USER_PROFILE_SUCCESS,
      profile: testProfile,
    })).toEqual({
      requesting: false,
      error: {},
      info: testProfile,
    });
  });
});
