import React from 'react';
import { mount } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import VerifyActivities from '../../src/containers/VerifyActivities';
import storeFixture from '../../src/fixtures/store';
import society from '../../src/fixtures/society';

const store = createMockStore(storeFixture);
const history = { push: () => { } };

describe('<VerifyActivities />', () => {
  it('should render without crashing', () => {
    const wrapper = mount.bind(
      null,
      <Provider store={store}>
        <MemoryRouter>
          <VerifyActivities.WrappedComponent
            history={history}
            fetchUserInfo={() => { }}
            changePageTitle={() => { }}
            fetchSocietyInfo={() => { }}
            societyActivities={society.loggedActivities}
          />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).not.toThrow();
  });
});
