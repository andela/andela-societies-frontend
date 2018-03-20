import React from 'react';
import { mount } from 'enzyme';
import FloatingActionButton from '../../../src/components/sidebar/FloatingActionButton';

describe('Testing <FloatingActionButton /> component', () => {
  it('should render withour crashing', () => {
    expect(mount.bind(null, <FloatingActionButton onClick={() => {}} />)).not.toThrow();
  });
});
