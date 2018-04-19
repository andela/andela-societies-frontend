import React from 'react';
import { mount } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import MyActivities from '../../src/containers/MyActivities';


const store = createMockStore({
  pageInfo: {
    url: '',
    title: '',
  },
  userInfo: {
    name: '',
    picture: '',
  },
  myActivities: {
    activities: [],
  },
});
const history = { push: () => { } };
const mounted = mount.bind(
  null,
  <Provider store={store}>
    <MemoryRouter>
      <MyActivities
        history={history}
        fetchUserInfo={() => {}}
        changePageTitle={() => {}}
      />
    </MemoryRouter>
  </Provider>,
);


describe('<MyActivities />', () => {
  it('should render without crashing', () => {
    expect(mounted).not.toThrow();
  });
});
