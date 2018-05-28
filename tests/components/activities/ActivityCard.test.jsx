import React from 'react';
import { mount, shallow } from 'enzyme';
import ActivityCard from '../../../src/components/activities/ActivityCard';
import activity from '../../../src/fixtures/activity';

describe('<ActivityCard />', () => {
  const wrapper = mount.bind(
    null,
    <ActivityCard {...activity} />,
  );

  const shallowWrapper = shallow(<ActivityCard {...activity} />);

  it('should render without crashing', () => {
    expect(wrapper).not.toThrowError();
  });

  it('should set default showUserDetails to false', () => {
    expect(wrapper().find('.activity__owner').length).toBe(0);
  });

  it('should render at least a description', () => {
    expect(wrapper().find('.activity__description').length).toBe(1);
  });

  it('should show user details', () => {
    const showUserDetails = true;
    const card = mount.bind(
      null,
      <ActivityCard showUserDetails={showUserDetails} {...activity} />,
    );
    expect(card().find('.activity__owner').length).toBe(1);
  });

  it('should render activity details', () => {
    expect(wrapper().find('.activity').length).toBe(1);
  });
});
