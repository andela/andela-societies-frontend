import React from 'react';
import { mount } from 'enzyme';
import ActionsComponent from '../ActionsComponent';

describe('<ActionsComponent />', () => {
  const props = {
    id: '31132321',
    handleVerify: jest.fn(),
  };
  const shallowWrapper = mount(<ActionsComponent {...props} />);

  it('should have 2 ButtonComponent components', () => {
    expect(shallowWrapper.find('ButtonComponent')).toHaveLength(2);
  });

  it('invokes onClick prop in reject button', () => {
    const spy = jest.spyOn(shallowWrapper.props(), 'handleVerify');
    shallowWrapper.find('button.action--reject').simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('invokes onClick prop in approve button', () => {
    const spy = jest.spyOn(shallowWrapper.props(), 'handleVerify');
    shallowWrapper.find('button.action--approve').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
