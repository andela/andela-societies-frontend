import React from 'react';
import { mount } from 'enzyme';
import MasonryLayout from '../../src/containers/MasonryLayout';
import items from '../../src/fixtures/items';

describe('<MasonryLayout />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<MasonryLayout
      items={items}
    />);
  });

  it('should display components for all items', () => {
    expect(wrapper.find('.masonry-layout__panel').length).toBe(items.length);
  });
});
