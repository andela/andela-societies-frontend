import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import InvictusLogo from '../../../src/components/bannerLogos/Invictus';

describe('<Invictus />', () => {
  const mounted = mount.bind(
    null,
    <MemoryRouter>
      <InvictusLogo />
    </MemoryRouter>,
  );
  it('should render without crashing', () => {
    expect(mounted).not.toThrow();
  });
});

