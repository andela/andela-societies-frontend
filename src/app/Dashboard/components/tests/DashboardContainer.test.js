import React from 'react';
import { shallow, mount } from 'enzyme';

import ACTIVITY_STATUS from '../../../common/constants';
import { activity } from '../../operations/tests/fixtures';
import { DashboardContainer } from '../DashboardContainer';

describe('<DashboardContainer />', () => {
  const setUpWrapper = ({
    error = null,
    loading = false,
    pointsEarned = 0,
    userActivities = [],
    activitiesLogged = 0,
    society = '',
  } = {}) => {
    const props = {
      error,
      loading,
      pointsEarned,
      userActivities,
      activitiesLogged,
      society,
    };
    const shallowWrapper = shallow(<DashboardContainer {...props} />);
    const mountedWrapper = mount(<DashboardContainer {...props} />);
    return {
      shallowWrapper,
      mountedWrapper,
    };
  };

  it('should return error message ', () => {
    const { shallowWrapper } = setUpWrapper({ error: { message: 'error ' } });
    expect(shallowWrapper.text()).toContain('The was an error while fetching your data. Please try again later.');
  });

  it('should return loading text when loading prop is true ', () => {
    const { shallowWrapper } = setUpWrapper({ loading: true });
    expect(shallowWrapper.text()).toContain('LoaderComponent');
  });

  it('should contain My Activities text', () => {
    const { shallowWrapper } = setUpWrapper();
    expect(shallowWrapper.find('.user-dashboard__title').html()).toContain('My Activities');
  });

  it('should contain <MyStatsComponent points={300} activities={2} />', () => {
    const { shallowWrapper } = setUpWrapper({ pointsEarned: 300, activitiesLogged: 2 });
    expect(shallowWrapper.find('.profile-overview').debug())
      .toContain('<MyStatsComponent points={300} activities={2} />');
  });

  it('should open the Log Points Modal', () => {
    const { shallowWrapper } = setUpWrapper();
    const instance = shallowWrapper.instance();
    expect(instance.state.logPoints).toBe(false);
    shallowWrapper.find('.button__add').simulate('click');
    expect(instance.state.logPoints).toBe(true);
  });

  it('toggles show state when showFilter is called', () => {
    const { shallowWrapper } = setUpWrapper();
    const instance = shallowWrapper.instance();
    shallowWrapper.setState({ show: true });
    instance.showFilter();
    expect(instance.state.show).toBeFalsy();
  });

  it('toggles show state when filter is clicked', () => {
    const { mountedWrapper } = setUpWrapper();
    const instance = mountedWrapper.instance();
    mountedWrapper.find('div#approved').simulate('click');
    expect(instance.state.show).toBeFalsy();
  });

  it('sets state of filteredUserActivities to null when Select all is checked', () => {
    const { mountedWrapper } = setUpWrapper();
    const instance = mountedWrapper.instance();
    instance.handleClick(0);
    expect(instance.state.filteredUserActivities).toBeNull();
  });

  it('changes filteredUserActivities state to have activities with approved status', () => {
    const activities = [activity];
    const { mountedWrapper } = setUpWrapper({ userActivities: activities });
    const instance = mountedWrapper.instance();
    const event = { target: { value: 'approved' }}
    const response = instance.handleClick(1)(event);
    const approvedActivities = activities.filter(item => item.status === ACTIVITY_STATUS.APPROVED);
    expect(response).toBeUndefined();
    expect(instance.state.filteredUserActivities).toEqual(approvedActivities);
  });

  it('changes filteredUserActivities state to null when handleClick is called and there are no activities to filter', () => {
    const activities = [];
    const { mountedWrapper } = setUpWrapper();
    const instance = mountedWrapper.instance();
    const event = { target: { value: 'approved' }}
    const response = instance.handleClick(1)(event);
    let approvedActivities = activities.filter(item => item.status === ACTIVITY_STATUS.APPROVED);
    expect(response).toBeUndefined();
    expect(instance.state.filteredUserActivities).toEqual(approvedActivities);
  });

  it('hides filter component when Filter button is clicked', () => {
    const { mountedWrapper } = setUpWrapper();
    mountedWrapper.setState({ show: true });
    const instance = mountedWrapper.instance();
    mountedWrapper.find('button.button__filter').simulate('click');
    expect(instance.state.show).toBeFalsy();
  });
});
