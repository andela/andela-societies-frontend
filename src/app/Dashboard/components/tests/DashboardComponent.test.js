import React from 'react';
import { shallow } from 'enzyme';
import { DashboardComponent } from '../DashboardComponent';

describe('<DashboardComponent />', () => {
  const setUpWrapper = ({
    error = null,
    loading = false,
    pointsEarned = 0,
    userActivities = [],
    activitiesLogged = 0,
  } = {}) => {
    const props = {
      error,
      loading,
      pointsEarned,
      userActivities,
      activitiesLogged,
    };
    const shallowWrapper = shallow(<DashboardComponent {...props} />);
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
    expect(shallowWrapper.text()).toContain('Loading ...');
  });

  it('should contain My Activities text', () => {
    const { shallowWrapper } = setUpWrapper();
    expect(shallowWrapper.find('.user-dashboard__title').html()).toContain('My Activities');
  });

  it('should contain <MyStatsComponent points={300} activities={2} />', () => {
    const { shallowWrapper } = setUpWrapper({ pointsEarned: 300, activitiesLogged: 2});
    expect(shallowWrapper.find('.profile-overview').debug()).toContain("<MyStatsComponent points={300} activities={2} />");
  });
});
