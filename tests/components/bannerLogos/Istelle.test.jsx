import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import IstelleLogo from '../../../src/components/bannerLogos/Istelle';

describe('<Istelle />', () => {
  const mounted = mount.bind(
    null,
    <MemoryRouter>
      <IstelleLogo />
    </MemoryRouter>,
  );
  it('should render without crashing', () => {
    expect(mounted).not.toThrow();
  });
});
