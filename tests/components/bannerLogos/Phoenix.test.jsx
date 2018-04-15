import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import PhoenixLogo from '../../../src/components/bannerLogos/Phoenix';

describe('<Phoenix />', () => {
  const mounted = mount.bind(
    null,
    <MemoryRouter>
      <PhoenixLogo />
    </MemoryRouter>,
  );
  it('should render without crashing', () => {
    expect(mounted).not.toThrow();
  });
});
