import React from 'react';
import { shallow } from 'enzyme';
import dateFns from 'date-fns';

import RedemptionsComponent from '../RedemptionsComponent';

import { redemptions, redemption } from './fixtures';

describe('<RedemptionsComponent />', () => {
  const setUpWrapper = ({ activities = [] } = {}) => {
    const props = {
      activities,
    };
    const shallowWrapper = shallow(<RedemptionsComponent {...props} />);
    return {
      shallowWrapper,
    };
  };

  it('should have a TableComponent', () => {
    const { shallowWrapper } = setUpWrapper();
    expect(shallowWrapper.find('TableComponent')).toHaveLength(1);
  });

  it('should have a description of no redemptions when activities prop is empty', () => {
    const { shallowWrapper } = setUpWrapper();
    expect(shallowWrapper.find('TableComponent').html()).toContain('There are no redemptions');
  });

  it('should have date of redemption in TableComponent', () => {
    const { shallowWrapper } = setUpWrapper({ activities: redemptions });
    const redemptionDate = dateFns.format(redemption.createdAt, 'MMM DD YYYY');
    expect(shallowWrapper.find('TableComponent').html()).toContain(`${redemptionDate}`);
  });

  it('should have a redemption table column names when selectedTab is redemptions', () => {
    const { shallowWrapper } = setUpWrapper({ activities: redemptions });
    expect(shallowWrapper.find('TableComponent').props().tableHeadings).toEqual([
      'Cash',
      'Date',
      'Event',
      'Points',
      'Status',
    ]);
  });
});
