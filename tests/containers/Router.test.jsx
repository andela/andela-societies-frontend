import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';

import Router from '../../src/containers/Router';
import storeFixture from '../../src/fixtures/store';

const store = createMockStore(storeFixture);

describe('<Router />', () => {
  it('should render without crashing', () => {
    expect(mount.bind(null, <Provider store={store}><Router /></Provider>)).not.toThrow();
  });
});
