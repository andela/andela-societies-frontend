import React from 'react';
import { shallow } from 'enzyme';
import NavbarComponent from '../NavbarComponent';

describe('<NavbarComponent />', () => {
  const shallowWrapper = shallow(<NavbarComponent />);

  it('should have the class navbar', () => {
    expect(shallowWrapper.find('.navbar')).toHaveLength(1);
  });

  it('should toggle sidebarState to true on invoking toggleSidebarState', () => {
    const instance = shallowWrapper.instance();
    instance.setState({
      sidebarState: false
    });
    instance.toggleSidebarState();
    expect(instance.state.sidebarState).toBe(true);
  });
});
