import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import SocietyBanner from '../../../src/components/header/SocietyBanner';

const society = {
  name: 'Invictus',
  points: 2021,
  image: '',
};

describe('<SocietyBanner />', () => {
  const mounted = mount.bind(
    null,
    <MemoryRouter>
      <SocietyBanner society={society} />
    </MemoryRouter>,
  );
  it('should render successfully', () => {
    expect(mounted).not.toThrow();
  });
});
