import React from 'react';
import { mount, shallow } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import MyActivities from '../../src/containers/MyActivities';
import storeFixture from '../../src/fixtures/store';

const store = createMockStore(storeFixture);
const history = { push: () => { } };
const fetchUserInfo = jest.fn();
const changePageTitle = jest.fn();
const fetchActivities = jest.fn();
const fetchCategories = jest.fn();

const mounted = mount.bind(
  null,
  <Provider store={store}>
    <MemoryRouter>
      <MyActivities
        history={history}
        fetchUserInfo={fetchUserInfo}
        changePageTitle={changePageTitle}
        fetchActivities={fetchActivities}
      />
    </MemoryRouter>
  </Provider>,
);
let shallowWrapper;

describe('<MyActivities />', () => {
  beforeEach(() => {
    shallowWrapper = shallow(<MyActivities.WrappedComponent
      history={history}
      fetchUserInfo={fetchUserInfo}
      changePageTitle={changePageTitle}
      fetchActivities={fetchActivities}
      fetchCategories={fetchCategories}
      categories={[]}
    />);
  });

  it('should render without crashing', () => {
    expect(mounted).not.toThrow();
  });

  it('should render loader when requesting activities', () => {
    shallowWrapper.setProps({ requesting: true });
    expect(shallowWrapper.find('Loader').length).toBe(1);
  });
});
