import React from 'react';
import { shallow } from 'enzyme';

import { Authenticate } from '../AuthenticateRoute';

describe('<AuthenticateRoute />', () => {
  const setUpWrapper = ({
    isAuthenticated = true,
  } = {}) => {
    const props = {
      component: jest.fn(),
      isAuthenticated,
      render: jest.fn()
    }
    return shallow(<Authenticate {...props} />)
  }

  it('renders Route component', () => {
    const wrapper = setUpWrapper();
    expect(wrapper.find('Route').exists()).toBe(true);
  });

  it('renders error message when component is not authenticated', () => {
    const wrapper = setUpWrapper({ isAuthenticated: false});
    wrapper.props().render({ isAuthenticated: false });
    expect(wrapper.props().render({ isAuthenticated: false })).toEqual(<div><h1> PLEASE LOGIN. NOT AUTHORIZED </h1></div>);
  });
});
