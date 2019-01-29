import React from 'react';
import { shallow } from 'enzyme';

import AuthenticateRoute from '../AuthenticateRoute';

describe('<AuthenticateRoute />', () => {
  const props = {
    component: jest.fn(),
    isAuthenticated: true,
    render: jest.fn()
  };

  const wrapper = shallow(<AuthenticateRoute {...props} />);

  it('renders Route component', () => {
    expect(wrapper.find('Route').exists()).toBe(true);
  });
});
