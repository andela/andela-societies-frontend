import React from 'react';
import { shallow } from 'enzyme';
import dateFns from 'date-fns';

import ApproveBudgetComponent from '../ApproveBudgetComponent';

import { redemptions, redemption } from '../../../Redemptions/components/tests/fixtures';

describe('<ApproveBudgetComponent />', () => {
  const setUpWrapper = ({ activities = [] } = {}) => {
    const props = {
      activities,
    };
    return shallow(<ApproveBudgetComponent {...props} />);
  };

  it('should have a TableComponent', () => {
    const shallowWrapper = setUpWrapper();
    expect(shallowWrapper.find('TableComponent')).toHaveLength(1);
  });

  it('should have a description of no budget when activities prop is empty', () => {
    const shallowWrapper = setUpWrapper();
    expect(shallowWrapper.find('TableComponent').html()).toContain('There is no budget to approve');
  });

  it('should have date of redemption in TableComponent', () => {
    const shallowWrapper = setUpWrapper({ activities: redemptions });
    const date = dateFns.format(redemption.createdAt, 'MMM DD YYYY');
    expect(shallowWrapper.find('TableComponent').html()).toContain(`${date}`);
  });

  it('should have a redemption table column names when selectedTab is redemptions', () => {
    const shallowWrapper = setUpWrapper({ activities: redemptions });
    expect(shallowWrapper.find('TableComponent').props().tableHeadings).toEqual([
      'Name',
      'Date',
      'Amount',
      'Description',
      'Actions',
    ]);
  });
});
