import React from 'react';
import { shallow } from 'enzyme';
import LinearLayout from '../../src/containers/LinearLayout';
import items from '../../src/fixtures/items';

describe('<MasonryLayout />', () => {
  const wrapper = shallow(<LinearLayout
    items={items}
  />);

  it('should display components for all items', () => {
    expect(wrapper.find('.linear-layout__panel').length).toBe(items.length);
  });
});
