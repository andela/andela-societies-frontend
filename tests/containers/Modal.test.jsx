import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Modal from '../../src/containers/Modal';

describe('<Modal />', () => {
  const callback = sinon.mock();
  const mounted = mount.bind(
    null,
    <Modal><div className='foo' /></Modal>,
  );
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Modal close={callback}><div className='bar' /></Modal>);
  });

  it('should render without crashing', () => {
    expect(mounted).not.toThrow();
  });

  it('should render it\'s children', () => {
    expect(mounted().find('.foo').length).toBe(1);
  });

  it('should be able to call the close() method', () => {
    wrapper.find('.modal').simulate('click');
    expect(callback.calledOnce).toBe(true);
  });
});
