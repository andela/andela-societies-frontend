import React from 'react';
import { shallow } from 'enzyme';
import SidebarComponent from '../SidebarComponent';

describe('<SidebarComponent />', () => {
  const shallowWrapper = shallow(<SidebarComponent />);

  it('should have the a nav item with text Settings', () => {
    expect(shallowWrapper.find('.sidebar_nav-label--footer').html()).toContain('Settings');
  });
});
