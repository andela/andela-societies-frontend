import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import SignIn from '../../src/containers/SignIn';

describe('<SignIn />', () => {
  const wrapper = shallow(<MemoryRouter><SignIn /></MemoryRouter>);

  it('should render successfully', () => {
    expect(wrapper.length).toBe(1);
  });
});
