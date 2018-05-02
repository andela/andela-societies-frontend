import React from 'react';
import { mount } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Society from '../../src/containers/Society';
import storeFixture from '../../src/fixtures/store';

const store = createMockStore(storeFixture);

const mounted = mount.bind(
  null,
  <Provider store={store}>
    <MemoryRouter>
      <Society />
    </MemoryRouter>
  </Provider>,
);

describe('<Society />', () => {
  it('should render without crashing', () => {
    expect(mounted).not.toThrow();
  });
});
