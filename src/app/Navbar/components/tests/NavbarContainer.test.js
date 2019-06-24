import React from 'react';
import { shallow } from 'enzyme';
import { NavbarContainer } from '../NavbarContainer';

describe('<NavbarContainer />', () => {
  const searchMock = jest.fn();
  const props = {
    userInfo: {
      name: 'test user',
      picture: 'image'
    },
    search: searchMock,
  };
  const shallowWrapper = shallow(<NavbarContainer {...props} />);

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

  it('invokes search prop with an argument on clicking search icon', () => {
    const instance = shallowWrapper.instance();
    instance.setState({ searchText: 'test'});
    const event = { preventDefault: jest.fn() };
    shallowWrapper.find('#basic-addon1').simulate('click', event);
    expect(searchMock).toBeCalledWith('test');
  });

  it('invokes search prop with empty argument on clicking search icon', () => {
    const instance = shallowWrapper.instance();
    instance.setState({ searchText: ''});
    const event = { preventDefault: jest.fn() };   
    shallowWrapper.find('#basic-addon1').simulate('click', event);
    expect(searchMock).toHaveBeenCalled();
  });

  it('changes searchText state and invokes search prop with argument', () => {
    const instance = shallowWrapper.instance();
    const event = {
      preventDefault() {},
      target: { value: 'test', name: 'searchText' }
    };
    shallowWrapper.find('.form-control-search').simulate('change', event);
    expect(searchMock).toBeCalledWith('test');
    expect(instance.state.searchText).toEqual('test');
  });

  it('invokes search prop without argument', () => {
    const event = {
      preventDefault() {},
      target: { value: '', name: 'searchText' }
    };
    shallowWrapper.find('.form-control-search').simulate('change', event);
    expect(searchMock).toHaveBeenCalled();
  });
});
