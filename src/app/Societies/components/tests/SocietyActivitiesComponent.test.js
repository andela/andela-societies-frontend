import React from 'react';
import { shallow } from 'enzyme';
import { format } from 'date-fns';

import SocietyActivitiesComponent from '../SocietyActivitiesComponent';

import activities, { activity } from '../../../Dashboard/operations/tests/fixtures';

describe('<SocietyActivitiesComponent />', () => {
  const setUpWrapper = ({ selectedTab = 'activities', societyActivities = activities } = {}) => {
    const props = {
      selectedTab,
      activities: societyActivities,
    };
    const shallowWrapper = shallow(<SocietyActivitiesComponent {...props} />);
    return {
      shallowWrapper,
    };
  };

  it('should have a TableComponent', () => {
    const { shallowWrapper } = setUpWrapper();
    expect(shallowWrapper.find('TableComponent')).toHaveLength(1);
  });

  it('should have a description of no activities when activities prop is empty', () => {
    const { shallowWrapper } = setUpWrapper({ societyActivities: [] });
    expect(shallowWrapper.find('TableComponent').html()).toContain('Your society does not have any activities');
  });

  it('should have date of activity in TableComponent', () => {
    const { shallowWrapper } = setUpWrapper();
    const activityDate = format(new Date(activity.createdAt), 'MMM dd yyyy');
    expect(shallowWrapper.find('TableComponent').html()).toContain(`${activityDate}`);
  });

  it('should have a redemption table column names when selectedTab is redemptions', () => {
    const { shallowWrapper } = setUpWrapper({ selectedTab: 'redemptions' });
    expect(shallowWrapper.find('TableComponent').props().tableHeadings).toEqual([
      'Points',
      'Cash',
      'Event',
      'Date',
      'Status',
    ]);
  });
});
