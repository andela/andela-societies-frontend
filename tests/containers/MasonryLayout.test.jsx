import React from 'react';
import { mount } from 'enzyme';
import MasonryLayout from '../../src/containers/MasonryLayout';

describe('<MasonryLayout />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<MasonryLayout
      items={[
        <div style={{ width: '300px' }} />,
        <div style={{ width: '300px' }} />,
      ]}
      gap={20}
      columnCount={2}
    />);
  });

  it('should display columns', () => {
    expect(wrapper.find('.masonry__column').length).toBeGreaterThan(0);
  });

  it('MasonryLayout.getColumnWidth() should return a valid value', () => {
    expect(wrapper.instance().getColumnWidth()).toBe('calc(50% - 20px)');
  });

  it('MasonryLayout.getColumnWrapperWidth() should return a valid value', () => {
    expect(wrapper.instance().getColumnWrapperWidth()).toBe('calc(100% + 20px)');
  });
});
