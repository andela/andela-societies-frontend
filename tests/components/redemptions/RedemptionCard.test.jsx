import React from 'react';
import { mount } from 'enzyme';
import RedemptionCard from '../../../src/components/redemptions/RedemptionCard';
import activity from '../../../src/fixtures/activity';

describe('<RedemptionCard />', () => {
  const wrapper = mount.bind(
    null,
    <RedemptionCard {...activity} />,
  );

  it('should render without crashing', () => {
    expect(wrapper).not.toThrowError();
  });

  it('should show user details', () => {
    const showUserDetails = true;
    const card = mount.bind(
      null,
      <RedemptionCard showUserDetails={showUserDetails} {...activity} />,
    );
    expect(card().find('.activity__owner').length).toBe(1);
  });

  it('should render activity details', () => {
    expect(wrapper().find('.activity').length).toBe(1);
  });
});
