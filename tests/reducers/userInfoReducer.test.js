import userInfoReducer from '../../src/reducers/userInfoReducer';
import { fetchUserInfo } from '../../src/actions';
import { fellowTokenInfo } from '../__mocks__/tokenInfoMock';

describe('userInfoReducer', () => {
  it('should return the initial state', () => {
    expect(userInfoReducer(undefined, {})).toEqual({});
  });

  it('should handle FETCH_USER_INFO', () => {
    const action = fetchUserInfo(fellowTokenInfo);
    const newState = userInfoReducer({}, action);
    expect(newState).toHaveProperty('name', fellowTokenInfo.UserInfo.name);
  });
});
