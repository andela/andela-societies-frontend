import React from 'react';
import { shallow } from 'enzyme';
import NavItemComponent from '../NavItemComponent';

describe('<NavItemComponent />', () => {
  const props = {
    route:'dashboard',
    iconClassName:'sidebar_nav-icon',
    labelClassName:'sidebar_nav-label',
    navItemClassName:'sidebar_nav-item',
  }
  const shallowWrapper = shallow(<NavItemComponent {...props} />);

  it('should have the class navbar', () => {
    expect(shallowWrapper.find('.sidebar_nav-item')).toHaveLength(1);
  });

  it('should have the route dashboard', () => {
    expect(shallowWrapper.find('.sidebar_nav-label').html()).toContain('Dashboard');
  });
});