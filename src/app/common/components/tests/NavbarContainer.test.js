import React from 'react';
import { shallow } from 'enzyme';
import NavbarContainer from '../NavbarContainer';

describe('<NavbarContainer />', () => {
  const shallowWrapper = shallow(<NavbarContainer />);

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
