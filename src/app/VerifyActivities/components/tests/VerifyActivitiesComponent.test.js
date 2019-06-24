import React from 'react';
import { shallow } from 'enzyme';
import { format } from 'date-fns';

import VerifyActivitiesComponent from '../VerifyActivitiesComponent';

import activities, { activity } from '../../../Dashboard/operations/tests/fixtures';

describe('<VerifyActivitiesComponent />', () => {
  const setUpWrapper = ({ activities = [] } = {}) => {
    const props = {
      activities,
    };
    const shallowWrapper = shallow(<VerifyActivitiesComponent {...props} />);
    return {
      shallowWrapper,
    };
  };

  it('should have a TableComponent', () => {
    const { shallowWrapper } = setUpWrapper();
    expect(shallowWrapper.find('TableComponent')).toHaveLength(1);
  });

  it('should have a description of no activities when activities prop is empty', () => {
    const { shallowWrapper } = setUpWrapper();
    expect(shallowWrapper.find('TableComponent').html()).toContain('There are no activities to verify');
  });

  it('should have date of activity in TableComponent', () => {
    const { shallowWrapper } = setUpWrapper({ activities });
    const activityDate = format(new Date(activity.date), 'MMM dd yyyy');
    expect(shallowWrapper.find('TableComponent').html()).toContain(`${activityDate}`);
  });

  it('should have a redemption table column names when selectedTab is redemptions', () => {
    const { shallowWrapper } = setUpWrapper({ activities });
    expect(shallowWrapper.find('TableComponent').props().tableHeadings).toEqual([
      'Name',
      'Date',
      'Activity',
      'Points',
      'Description',
      'Actions',
    ]);
  });
});
