import React from 'react';
import { mount } from 'enzyme';
import ActivityCard from '../../../src/components/redemptions/ActivityCard';
import activity from '../../../src/fixtures/activity';

describe('<ActivityCard />', () => {
  const activityClone = Object.assign({}, activity);
  const wrapper = mount.bind(
    null,
    <ActivityCard {...activity} />,
  );
  activityClone.status = 'approved';
  const wrapper2 = mount(<ActivityCard {...activityClone} />);
  activityClone.showUserDetails = true;
  const wrapper3 = mount(<ActivityCard {...activityClone} />);

  it('should render without crashing', () => {
    expect(wrapper).not.toThrowError();
  });

  it('should correctly indicate status icon', () => {
    expect(wrapper().find('.activity__status--default').length).toBe(1);
    expect(wrapper2.find('.activity__status--approved').length).toBe(1);
  });

  it('should indicate status text with first letter in uppercase', () => {
    expect(wrapper2.find('.activity__status').text()).toBe('Approved');
  });

  it('should show user details', () => {
    expect(wrapper3.find('.activity__left').length).toBe(1);
  });
});
