import React from 'react';
import { mount, shallow } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { spy } from 'sinon';

import Header from '../../../src/components/header/Header';
import { nonFellowTokenInfo } from '../../__mocks__/tokenInfoMock';
import storeFixture from '../../../src/fixtures/store';
import testProfile from '../../../src/fixtures/userProfile';

const store = createMockStore(storeFixture);
const history = { push: spy() };

const props = {
  history,
  userInfo : nonFellowTokenInfo.UserInfo,
  profile: testProfile
}

const mounted = mount.bind(
  null,
  <Provider store={store}>
    <MemoryRouter>
      <Header
        {...props}
      />
    </MemoryRouter>
  </Provider>,
);

const wrapper = shallow(<Header {...props} />);
describe('<Header />', () => {
  it('should render without crashing', () => {
    expect(mounted).not.toThrow();
  });

  it('should call history.push props when logout is invoked ', () => {
    wrapper.instance().logOut();
    expect(history.push.called).toBeTruthy();
  });
});
