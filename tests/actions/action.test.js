import { fetchUserInfo } from '../../src/actions';
import { FETCH_USER_INFO } from '../../src/actions/constants';
import { fellowTokenInfo } from '../__mocks__/tokenInfoMock';

describe('fetchUserInfo', () => {
  it('should create an action to fetch user info', () => {
    const expectedAction = {
      type: FETCH_USER_INFO,
      tokenInfo: fellowTokenInfo,
    };
    expect(fetchUserInfo(fellowTokenInfo)).toEqual(expectedAction);
  });
});

