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

  it('should display the ErrorMessage component if there are no items', () => {
    wrapper.setProps({ items: [] });
    expect(wrapper.find('ErrorMessage').length).toBe(1);
  });
});
