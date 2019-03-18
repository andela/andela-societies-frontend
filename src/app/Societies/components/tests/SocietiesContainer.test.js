import React from 'react';
import { shallow } from 'enzyme';

import { SocietiesContainer } from '../SocietiesContainer';

import activities from '../../../Dashboard/operations/tests/fixtures';

describe('<SocietiesContainer />', () => {
  const props = {
    match: {
      params: {
        society: '',
      },
    },
    usedPoints: 100,
    remainingPoints: 100,
    totalPoints: 200,
    activitiesLogged: activities.length,
    loggedActivities: activities,
    fetchSocietyInfoRequest: jest.fn(),
  };
  const shallowWrapper = shallow(<SocietiesContainer {...props} />);

  it('has a 2 ButtonComponents', () => {
    expect(shallowWrapper.find('ButtonComponent')).toHaveLength(2);
  });

  it('has Activities and Redemptions text tabs', () => {
    expect(shallowWrapper.find('.society__tabs').text()).toContain('ActivitiesRedemptions');
  });
});
