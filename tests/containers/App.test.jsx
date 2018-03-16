import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import App from '../../src/containers/App';

describe('<App />', () => {
  it('should render without crashing', () => {
    expect(mount.bind(null, <MemoryRouter><App /></MemoryRouter>)).not.toThrow();
  });
});
