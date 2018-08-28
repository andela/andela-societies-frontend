import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { MemoryRouter } from 'react-router-dom';

import PrivateRoute from '../../../src/components/routes/PrivateRoute';
import VerifyActivities from '../../../src/containers/VerifyActivities';
import storeFixture from '../../../src/fixtures/store';
import { SOCIETY_SECRETARY, SUCCESS_OPS } from '../../../src/constants/roles';
import profile from '../../../src/fixtures/userProfile';

const store = createMockStore(storeFixture);

const pageInfoData = {
  title: 'Verify Activities',
  url: '/u/verify-activities',
  component: VerifyActivities,
  allowedRoles: [SUCCESS_OPS, SOCIETY_SECRETARY],
};

describe('<PrivateRoute />', () => {
  it('should render without crashing', () => {
    expect(mount
      .bind(null, <Provider
        store={store}
      >
        <MemoryRouter>
          <PrivateRoute
            path={pageInfoData.url}
            exact
            component={pageInfoData.component}
            key={pageInfoData.title}
            allowedRoles={pageInfoData.allowedRoles}
            userRoles={profile.roles && Object.keys(profile.roles)}
          />
        </MemoryRouter>
      </Provider>)).not.toThrow();
  });
});
