import React from 'react';
import { shallow } from 'enzyme';
import { SidebarContainer } from '../SidebarContainer';

describe('<SidebarContainer />', () => {
  const props = {
    userId: '',
    className: '',
    userRole: {},
    fetchUserRole: jest.fn(),
    toggleSidebarState: jest.fn(),
  }
  const shallowWrapper = shallow(<SidebarContainer {...props} />);

  it('should have the a nav item with text Settings', () => {
    expect(shallowWrapper.find('.sidebar_nav-label--footer').html()).toContain('Settings');
  });

  it('has LogoComponent', () => {
    expect(shallowWrapper.find('LogoComponent')).toHaveLength(1);
  });
});
