import React from 'react';
import { mount } from 'enzyme';
import ActivityCard from '../../../src/components/activities/ActivityCard';
import activity from '../../../src/fixtures/activity';

describe('<ActivityCard />', () => {
  const wrapper = mount.bind(
    null,
    <ActivityCard {...activity} />,
  );

  it('should render without crashing', () => {
    expect(wrapper).not.toThrowError();
  });

  it('should set default showUserDetails to false', () => {
    expect(wrapper().find('.activity__userName').length).toBe(0);
  });

  it('should render activity details', () => {
    expect(wrapper().find('.activity').length).toBe(1);
  });
});
