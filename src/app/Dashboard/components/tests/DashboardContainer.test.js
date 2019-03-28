import React from 'react';
import { shallow } from 'enzyme';

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
    return {
      shallowWrapper,
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
});
