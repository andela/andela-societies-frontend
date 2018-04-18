import React from 'react';
import { mount } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Redemptions from '../../src/containers/Redemptions';


const store = createMockStore({
  pageInfo: {
    url: '',
    title: '',
  },
  userInfo: {
    name: '',
    picture: '',
  },
});
const history = { push: () => { } };
const mounted = mount.bind(
  null,
  <Provider store={store}>
    <MemoryRouter>
      <Redemptions
        history={history}
        fetchUserInfo={() => {}}
        changePageTitle={() => {}}
      />
    </MemoryRouter>
  </Provider>,
);


describe('<Redemptions />', () => {
  it('should render without crashing', () => {
    expect(mounted).not.toThrow();
  });
});
