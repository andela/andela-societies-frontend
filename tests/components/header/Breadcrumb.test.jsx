import React from 'react';
import { mount } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Breadcrumb from '../../../src/components/header/Breadcrumb';
import storeFixture from '../../../src/fixtures/store';

const store = createMockStore(storeFixture);

describe('<Breadcrumb />', () => {
  const mounted = mount.bind(
    null,
    <Provider store={store}>
      <MemoryRouter>
        <Breadcrumb
          fetchUserInfo={() => {}}
          changePageTitle={() => {}}
        >
          content
        </Breadcrumb>
      </MemoryRouter>
    </Provider>,
  );

  it('should render without crashing', () => {
    expect(mounted).not.toThrow();
  });
});
