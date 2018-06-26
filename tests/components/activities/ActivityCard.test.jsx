import React from 'react';
import { mount, shallow } from 'enzyme';
import ActivityCard from '../../../src/components/activities/ActivityCard';
import activity from '../../../src/fixtures/activity';

describe('<ActivityCard />', () => {
  const props = {
    page: '/u/verify-activities',
  };
  const wrapper = mount.bind(
    null,
    <ActivityCard {...activity} />,
  );

  const shallowWrapper = shallow(<ActivityCard {...props} {...activity} />);

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

  it('should render approve and reject buttons on verify activities page', () => {
    expect(shallowWrapper.find('.activity-button').length).toBe(2);
  });

  it('should render check box on verify activities page cards', () => {
    expect(shallowWrapper.find('.activity__checkbox').length).toBe(1);
  });

  it('should change state when a checkbox of an activity is clicked', () => {
    shallowWrapper.setState({ isActivityChecked: true });
    const checkbox = shallowWrapper.find('.activity__checkbox');
    checkbox.simulate('change');
    expect(shallowWrapper.state().isActivityChecked).toBe(false);
  });
});
