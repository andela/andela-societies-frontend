import React from 'react';
import { mount, shallow } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import VerifyActivities from '../../src/containers/VerifyActivities';
import storeFixture from '../../src/fixtures/store';
import society from '../../src/fixtures/society';

const store = createMockStore(storeFixture);
const history = { push: () => { }, location: { pathname: '' } };

describe('<VerifyActivities />', () => {
  const component = shallow(<VerifyActivities.WrappedComponent
    history={history}
    fetchUserInfo={() => { }}
    verifyActivity={() => {}}
    changePageTitle={() => { }}
    fetchSocietyInfo={() => { }}
    societyActivities={society.loggedActivities}
    requesting={false}
  />);

  it('should render without crashing', () => {
    const wrapper = mount.bind(
      null,
      <Provider store={store}>
        <MemoryRouter>
          <VerifyActivities.WrappedComponent
            history={history}
            fetchUserInfo={() => { }}
            verifyActivity={() => {}}
            changePageTitle={() => { }}
            fetchSocietyInfo={() => { }}
            societyActivities={society.loggedActivities}
            requesting={false}
          />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).not.toThrow();
  });

  it('should show loader when fetching', () => {
    component.setProps({ requesting: true });
    expect(component.find('.loader').length).toBe(1);
  });
});
