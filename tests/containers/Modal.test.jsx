import React from 'react';
import { mount } from 'enzyme';
import Modal from '../../src/containers/Modal';

describe('<Modal />', () => {
  const mounted = mount.bind(
    null,
    <Modal><div className='foo' /></Modal>,
  );
  it('should render without crashing', () => {
    expect(mounted).not.toThrow();
  });

  it('should render it\'s children', () => {
    expect(mounted().find('.foo').length).toBe(1);
  });
});
