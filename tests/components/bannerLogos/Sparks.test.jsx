import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import SparksLogo from '../../../src/components/bannerLogos/Sparks';

describe('<Sparks />', () => {
  const mounted = mount.bind(
    null,
    <MemoryRouter>
      <SparksLogo />
    </MemoryRouter>,
  );
  it('should render without crashing', () => {
    expect(mounted).not.toThrow();
  });
});
