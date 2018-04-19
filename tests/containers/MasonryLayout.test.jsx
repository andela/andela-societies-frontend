import React from 'react';
import { mount } from 'enzyme';
import MasonryLayout from '../../src/containers/MasonryLayout';
import activities from '../../src/fixtures/activities';

describe('<MasonryLayout />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<MasonryLayout
      items={activities}
    />);
  });

  it('should display components for all items', () => {
    expect(wrapper.find('.masonry-layout__panel').length).toBe(activities.length);
  });
});
