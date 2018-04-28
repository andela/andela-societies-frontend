import React from 'react';
import { mount } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';

import Header from '../../../src/components/header/Header';
import { nonFellowTokenInfo } from '../../__mocks__/tokenInfoMock';
import storeFixture from '../../../src/fixtures/store';

const store = createMockStore(storeFixture);
const history = { push: () => { } };

const mounted = mount.bind(
  null,
  <Provider store={store}>
    <Header
      userInfo={nonFellowTokenInfo.UserInfo}
      history={history}
    />
  </Provider>,
);
describe('<Header />', () => {
  it('should render without crashing', () => {
    expect(mounted).not.toThrow();
  });
});
