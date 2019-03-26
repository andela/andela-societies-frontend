import React from 'react';
import { shallow } from 'enzyme';
import { format } from 'date-fns';

import MyActivitiesComponent from '../MyActivitiesComponent';

import activities, { activity } from '../../operations/tests/fixtures';

describe('<MyActivitiesComponent />', () => {
  const setUpWrapper = ({
    userActivities = activities,
  } = {}) => {
    const props = {
      userActivities,
    };
    const shallowWrapper = shallow(<MyActivitiesComponent {...props} />);
    return {
      shallowWrapper,
    };
  };

  it('should have a TableComponent', () => {
    const { shallowWrapper } = setUpWrapper();
    expect(shallowWrapper.find('TableComponent')).toHaveLength(1);
  });

  it('should have a description of no logged activities when userActivities prop is empty', () => {
    const { shallowWrapper } = setUpWrapper({ userActivities: [] });
    expect(shallowWrapper.find('TableComponent').html()).toContain('You have not logged any activities');
  });

  it('should have date of activity in TableComponent', () => {
    const { shallowWrapper } = setUpWrapper();
    const activityDate = format(new Date(activity.date), 'MMM dd yyyy');
    expect(shallowWrapper.find('TableComponent').html()).toContain(`${activityDate}`);
  });
});
