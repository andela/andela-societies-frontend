import React from 'react';
import { shallow } from 'enzyme';

import { VerifyActivitiesContainer } from '../VerifyActivitiesContainer';

import activities from '../../../Dashboard/operations/tests/fixtures';
import ACTIVITY_STATUS from '../../constants';

describe('<VerifyActivitiesContainer />', () => {
  const props = {
    societyName: 'phoenix',
    society: {
      phoenix: {
        usedPoints: 100,
        remainingPoints: 100,
        totalPoints: 200,
        activitiesLogged: activities.length,
        loggedActivities: activities,
      },
      istelle: {
        usedPoints: 100,
        remainingPoints: 100,
        totalPoints: 200,
        activitiesLogged: activities.length,
        loggedActivities: activities,
      },
    },
    fetchSocietyInfoRequest: jest.fn(),
    fetchUserActivites: jest.fn(),
  };
  const shallowWrapper = shallow(<VerifyActivitiesContainer {...props} />);

  it('has a 2 ButtonComponents', () => {
    expect(shallowWrapper.find('ButtonComponent')).toHaveLength(2);
  });

  it('has VerifyActivitiesComponent', () => {
    expect(shallowWrapper.find('VerifyActivitiesComponent')).toHaveLength(1);
  });

  it('has SocietyStatsComponent', () => {
    expect(shallowWrapper.find('SocietyStatsComponent')).toHaveLength(1);
  });

  it('returns activities with in review status', () => {
    const instance = shallowWrapper.instance();
    const inReviewActivities = activities.filter(item => item.status === ACTIVITY_STATUS.IN_REVIEW);
    expect(instance.filterActivitiesByInReviewStatus(activities)).toEqual(inReviewActivities);
  });

  it('invokes fetchSocietyInfoRequest in componentDidUpdate when societyName props change', () => {
    const instance = shallowWrapper.instance();
    const spy = jest.spyOn(instance.props, 'fetchSocietyInfoRequest');
    shallowWrapper.setProps({ societyName: 'istelle' });
    expect(spy).toHaveBeenCalled();
  });
});
