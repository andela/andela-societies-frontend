import React from 'react';
import { mount } from 'enzyme';
import { SidebarContainer } from '../SidebarContainer';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<SidebarContainer />', () => {
  const setUpWrapper = ({ userRole = {} } = {}) => {
    const props = {
      userRole,
      userId: '',
      className: '',
      fetchUserRole: jest.fn(),
      toggleSidebarState: jest.fn(),
    };
    return mount(<Router><SidebarContainer {...props} /></Router>);
  };

  it('should have the a nav item with text Settings', () => {
    const wrapper = setUpWrapper();
    expect(wrapper.find('.sidebar_nav-label--footer').html()).toContain('Settings');
  });

  it('has LogoComponent', () => {
    const wrapper = setUpWrapper();
    expect(wrapper.find('LogoComponent')).toHaveLength(1);
  });

  it('has Verify Activities navigation item', () => {
    const wrapper = setUpWrapper({ userRole: { 'society secretary': '12345' }});
    expect(wrapper.html()).toContain('Verify-activities');
  });

  it('has Redemptions navigation item', () => {
    const wrapper = setUpWrapper({ userRole: { 'society president': '12345' }});
    expect(wrapper.html()).toContain('Redemptions');
  });
});
