import React from 'react';
import { mount } from 'enzyme';
import FloatingButton from '../../../src/common/FloatingButton';

describe('Testing <FloatingButton /> component', () => {
  it('should render withour crashing', () => {
    expect(mount.bind(null, <FloatingButton onClick={() => {}} />)).not.toThrow();
  });
});
